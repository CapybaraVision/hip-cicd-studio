'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Paper, Text, Stack, Group, Badge, ThemeIcon, Button, Modal, TextInput, Select, Loader, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GripVertical, Plus, RefreshCw } from 'lucide-react';
import classes from './KanbanBoard.module.css';

const COLUMN_CONFIG = {
    'Todo': { title: 'To Do', color: 'gray' },
    'InProgress': { title: 'In Progress', color: 'blue' },
    'Review': { title: 'Review', color: 'orange' },
    'Done': { title: 'Done', color: 'teal' }
};

export function KanbanBoard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Medium');
    const [submitting, setSubmitting] = useState(false);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/kanban');
            const items = await res.json();

            // Transform flat items to DnD structure
            const newTasks: any = {};
            const newColumns: any = {
                'col-1': { id: 'col-1', status: 'Todo', title: 'To Do', color: 'gray', taskIds: [] },
                'col-2': { id: 'col-2', status: 'InProgress', title: 'In Progress', color: 'blue', taskIds: [] },
                'col-3': { id: 'col-3', status: 'Review', title: 'Review', color: 'orange', taskIds: [] },
                'col-4': { id: 'col-4', status: 'Done', title: 'Done', color: 'teal', taskIds: [] },
            };

            if (Array.isArray(items)) {
                items.forEach((item: any) => {
                    newTasks[item.id] = { id: item.id, content: item.title, priority: item.priority };

                    // Map status to column
                    let colId = 'col-1';
                    if (item.status === 'InProgress') colId = 'col-2';
                    if (item.status === 'Review') colId = 'col-3';
                    if (item.status === 'Done') colId = 'col-4';

                    newColumns[colId].taskIds.push(item.id);
                });
            }

            setData({
                tasks: newTasks,
                columns: newColumns,
                columnOrder: ['col-1', 'col-2', 'col-3', 'col-4']
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddTask = async () => {
        if (!newTaskTitle) return;
        setSubmitting(true);
        try {
            await fetch('/api/kanban', {
                method: 'POST',
                body: JSON.stringify({
                    title: newTaskTitle,
                    priority: newTaskPriority,
                    status: 'Todo'
                })
            });
            await fetchData();
            close();
            setNewTaskTitle('');
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!data || !result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };
            setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
            return;
        }

        // Moving between columns
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = { ...start, taskIds: startTaskIds };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };

        setData({
            ...data,
            columns: { ...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish }
        });

        // Optimistic update done, ideally sync to server here
        // For now, we only sync 'Add Item'. Moving items requires a PATCH endpoint which is next step.
    };

    if (loading) return <Center h={400}><Loader /></Center>;
    if (!data) return <Text>Error loading board</Text>;

    return (
        <div className={classes.board} style={{ width: '100%', height: '100%' }}>
            <Group justify="space-between" mb="md" px="sm">
                <Text fw={700} size="lg">Sprint Board</Text>
                <Group>
                    <Button leftSection={<RefreshCw size={14} />} variant="subtle" size="xs" onClick={fetchData}>Refresh</Button>
                    <Button leftSection={<Plus size={14} />} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} size="xs" onClick={open}>Add Task</Button>
                </Group>
            </Group>

            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', width: '100%', justifyContent: 'center' }}>
                    {data.columnOrder.map((columnId: string) => {
                        const column = data.columns[columnId];
                        const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);

                        return (
                            <div key={column.id} className={classes.column} style={{ minWidth: 280, width: 280 }}>
                                <Group mb="md" justify="space-between">
                                    <Group gap="xs">
                                        <ThemeIcon color={column.color} variant="light" size="sm" radius="xl">
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }} />
                                        </ThemeIcon>
                                        <Text fw={600} size="sm">{column.title}</Text>
                                        <Badge variant="transparent" color="gray" size="sm" circle>{tasks.length}</Badge>
                                    </Group>
                                </Group>

                                <Droppable droppableId={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={classes.taskList}
                                            style={{ minHeight: 100, background: snapshot.isDraggingOver ? 'rgba(255,255,255,0.05)' : 'transparent', borderRadius: 8, transition: 'background 0.2s' }}
                                        >
                                            {tasks.map((task: any, index: number) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <Paper
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={classes.task}
                                                            shadow="sm"
                                                            withBorder
                                                            p="sm"
                                                            radius="md"
                                                            mb="sm"
                                                            style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                                                        >
                                                            <Group justify="space-between" align="flex-start" mb={4}>
                                                                <Text size="sm" fw={500} style={{ lineHeight: 1.4 }}>{task.content}</Text>
                                                                <GripVertical size={14} style={{ opacity: 0.3 }} />
                                                            </Group>
                                                            <Badge size="xs" variant="dot" color={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'gray'}>
                                                                {task.priority || 'Medium'}
                                                            </Badge>
                                                        </Paper>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>

            <Modal opened={opened} onClose={close} title="Add New Task" centered>
                <Stack>
                    <TextInput label="Task Title" placeholder="What needs to be done?" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
                    <Select label="Priority" data={['High', 'Medium', 'Low']} value={newTaskPriority} onChange={(v) => setNewTaskPriority(v || 'Medium')} />
                    <Button onClick={handleAddTask} loading={submitting} fullWidth mt="md">Create Task</Button>
                </Stack>
            </Modal>
        </div>
    );
}
