'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Paper, Title, Text, Stack, Group, Badge, ThemeIcon } from '@mantine/core';
import { GripVertical, Plus } from 'lucide-react';
import classes from './KanbanBoard.module.css';

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: '기획서 작성', priority: 'high' },
        'task-2': { id: 'task-2', content: '디자인 시안 검토', priority: 'medium' },
        'task-3': { id: 'task-3', content: 'DB 스키마 설계', priority: 'high' },
        'task-4': { id: 'task-4', content: '로그인 API 구현', priority: 'low' },
    },
    columns: {
        'col-1': {
            id: 'col-1',
            title: '진행 예정',
            taskIds: ['task-1', 'task-2'],
            color: 'gray',
        },
        'col-2': {
            id: 'col-2',
            title: '진행 중',
            taskIds: ['task-3'],
            color: 'blue',
        },
        'col-3': {
            id: 'col-3',
            title: '리스크 확인',
            taskIds: [],
            color: 'red',
        },
        'col-4': {
            id: 'col-4',
            title: '완료',
            taskIds: ['task-4'],
            color: 'teal',
        },
    },
    columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
};

export function KanbanBoard() {
    const [data, setData] = useState(initialData);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId as keyof typeof data.columns];
        const finish = data.columns[destination.droppableId as keyof typeof data.columns];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setData(newState);
            return;
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setData(newState);
    };

    return (
        <div className={classes.board}>
            <DragDropContext onDragEnd={onDragEnd}>
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId as keyof typeof data.columns];
                    const tasks = column.taskIds.map((taskId) => data.tasks[taskId as keyof typeof data.tasks]);

                    return (
                        <div key={column.id} className={classes.column}>
                            <Group mb="md" justify="space-between">
                                <Group gap="xs">
                                    <ThemeIcon color={column.color} variant="light" size="sm" radius="xl">
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }} />
                                    </ThemeIcon>
                                    <Text fw={600} size="sm">{column.title}</Text>
                                    <Badge variant="transparent" color="gray" size="sm" circle>
                                        {tasks.length}
                                    </Badge>
                                </Group>
                                <Plus size={16} style={{ cursor: 'pointer', opacity: 0.5 }} />
                            </Group>

                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={classes.taskList}
                                        data-dragging-over={snapshot.isDraggingOver || undefined}
                                    >
                                        {tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <Paper
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={classes.task}
                                                        data-dragging={snapshot.isDragging || undefined}
                                                        shadow="sm"
                                                        withBorder
                                                        p="sm"
                                                        radius="md"
                                                    >
                                                        <Group justify="space-between" align="flex-start" mb={4}>
                                                            <Text size="sm" fw={500} style={{ lineHeight: 1.4 }}>{task.content}</Text>
                                                            <GripVertical size={14} style={{ opacity: 0.3 }} />
                                                        </Group>
                                                        <Badge
                                                            size="xs"
                                                            variant="dot"
                                                            color={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'gray'}
                                                        >
                                                            {task.priority}
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
            </DragDropContext>
        </div>
    );
}
