'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
    ko: {
        // Header
        'header.badge': '비즈니스 프로',
        'header.title': 'CIcircle CI/CD 대시보드',
        'header.subtitle': '실시간 비즈니스 및 프로젝트 상태체크',
        'header.rollback': '긴급 롤백',
        'header.reports': '리포트',
        'header.export': '데이터 내보내기',

        // KPI
        'kpi.active_users': '활성 사용자',
        'kpi.conversion': '전환율',
        'kpi.retention': '재방문율',
        'kpi.system_health': '시스템 상태',
        'kpi.stable': '안정적',
        'kpi.today': '오늘',

        // Titles
        'title.impact': '배포 성과 분석',
        'title.pulse': '더 펄스 (Live)',
        'title.health': '제품 건강 지표',
        'title.voc': 'VoC 파이프라인',
        'title.sprint': '스프린트 보드',
        'title.deployment': '배포 현황',
        'title.user_growth': '주간 활성 사용자',

        // Pulse
        'pulse.live': '실시간',
        'pulse.ai_mode': 'AI 번역 모드',
        'pulse.ai_on': '번역 켜짐',

        // ROI
        'roi.revenue': '매출 기여분',
        'roi.users': '유저 증가',
        'roi.error': '에러율',
        'roi.impact_high': '높은 임팩트 🚀',

        // VoC
        'voc.process_btn': 'AI로 티켓 변환',
        'voc.incoming': '들어온 피드백',
        'voc.generated': '생성된 티켓',
        'voc.empty_feedback': '대기중인 피드백 없음',
        'voc.empty_ticket': '처리된 티켓 없음',

        // Health
        'health.stability': '안정성',
        'health.sentiment': '사용자 민심',
        'health.velocity': '개발 속도',
        'health.healthy': '시스템 건강함',
        'health.attention': '주의 필요',
        'health.critical_msg': '유저 민심이 바닥입니다. 기능 개발을 멈추고 버그를 잡으세요.',
        'health.healthy_msg': '모든 시스템 정상. 스케일업 준비 완료.',
    },
    en: {
        // Header
        'header.badge': 'Business Pro',
        'header.title': 'Global Command Center',
        'header.subtitle': 'Real-time Business Intelligence & Project Status',
        'header.rollback': 'Emergency Rollback',
        'header.reports': 'Reports',
        'header.export': 'Export Data',

        // KPI
        'kpi.active_users': 'Active Users',
        'kpi.conversion': 'Conversion Rate',
        'kpi.retention': 'Retention',
        'kpi.system_health': 'System Health',
        'kpi.stable': 'Stable',
        'kpi.today': 'today',

        // Titles
        'title.impact': 'Impact Analysis',
        'title.pulse': 'The Pulse',
        'title.health': 'Product Health Index',
        'title.voc': 'VoC Pipeline',
        'title.sprint': 'Sprint Board',
        'title.deployment': 'Deployment Activity',
        'title.user_growth': 'Weekly Active Users',

        // Pulse
        'pulse.live': 'Live',
        'pulse.ai_mode': 'AI Mode',
        'pulse.ai_on': 'Translated',

        // ROI
        'roi.revenue': 'Revenue Impact',
        'roi.users': 'User Growth',
        'roi.error': 'Error Rate',
        'roi.impact_high': 'High Impact 🚀',

        // VoC
        'voc.process_btn': 'AI Convert to Ticket',
        'voc.incoming': 'INCOMING FEEDBACK',
        'voc.generated': 'GENERATED TICKETS',
        'voc.empty_feedback': 'No pending feedback.',
        'voc.empty_ticket': 'No processed tickets yet.',

        // Health
        'health.stability': 'Stability',
        'health.sentiment': 'Sentiment',
        'health.velocity': 'Velocity',
        'health.healthy': 'System Healthy',
        'health.attention': 'Attention Needed',
        'health.critical_msg': 'User sentiment is critically low. Consider freezing features to fix bugs.',
        'health.healthy_msg': 'All systems operational. Ready for scale.',
    }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>('ko');

    const t = (key: string) => {
        return translations[lang][key as keyof typeof translations['ko']] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
