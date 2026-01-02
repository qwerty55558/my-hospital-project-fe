import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEye, faMicroscope, faStethoscope } from '@fortawesome/free-solid-svg-icons';

export interface Service {
    id: string;
    title: string;
    icon: IconDefinition;
    description: string;
    items: string[];
}

export const SERVICES: Service[] = [
    {
        id: 'general',
        title: '일반 안과 질환',
        icon: faStethoscope,
        description: '다양한 안질환에 대한 정밀 검사와 맞춤형 치료를 제공합니다.',
        items: ['노안/백내장', '녹내장', '망막/황반변성', '안구건조증', '비문증']
    },
    {
        id: 'vision',
        title: '시력교정 센터',
        icon: faEye,
        description: '개개인의 눈 상태에 가장 적합한 최적의 시력교정술을 제안합니다.',
        items: ['라식/라섹', '안내렌즈삽입술', '스마일라식', '노안 교정술']
    },
    {
        id: 'special',
        title: '특수 클리닉',
        icon: faMicroscope,
        description: '특화된 분야의 전문적인 진료 시스템을 갖추고 있습니다.',
        items: ['드림렌즈', '소아안과/사시', '원추각막', '콘택트렌즈']
    }
];
