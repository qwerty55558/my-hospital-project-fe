'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faNewspaper, 
    faBullhorn, 
    faCalendarCheck, 
    faInbox,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

interface Post {
    id: number;
    type: 'notice' | 'news' | 'event';
    title: string;
    content: string;
    thumbnail?: string;
    date: string;
}

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'notice' | 'news' | 'event'>('all');

    // API 연동을 위한 소켓 (추후 fetch url만 교체 가능하도록 구조화)
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                // TODO: API 주소 확정 시 아래 주소 활성화
                // const response = await fetch('https://api.yourhospital.com/posts');
                // const data = await response.json();
                // setPosts(data);
                
                // 현재는 데이터가 없는 상태를 기본으로 함 (테스트를 위해 비워둠)
                setPosts([]); 
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => 
        filter === 'all' ? true : post.type === filter
    );

    const getTypeInfo = (type: Post['type']) => {
        switch (type) {
            case 'notice': return { label: '공지', color: 'bg-blue-100 text-blue-600', icon: faBullhorn };
            case 'news': return { label: '보도', color: 'bg-gray-100 text-gray-600', icon: faNewspaper };
            case 'event': return { label: '이벤트', color: 'bg-pink-100 text-pink-600', icon: faCalendarCheck };
        }
    };

    return (
        <div className="pt-48 pb-24 px-6 max-w-6xl mx-auto min-h-screen">
            {/* Header */}
            <div className="mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-6 text-[#191F28]"
                >
                    병원 소식
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-500"
                >
                    마이병원의 새로운 소식과 유익한 건강 정보를 전달해 드립니다.
                </motion.p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                {(['all', 'notice', 'news', 'event'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                            filter === t 
                            ? 'bg-[#191F28] text-white shadow-lg' 
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                    >
                        {t === 'all' ? '전체' : t === 'notice' ? '공지사항' : t === 'news' ? '언론보도' : '이벤트'}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {loading ? (
                    // Skeleton Loading State
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 aspect-video rounded-3xl mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                            </div>
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    // Post List
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, idx) => {
                            const typeInfo = getTypeInfo(post.type);
                            return (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-gray-100 shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                                        {post.thumbnail ? (
                                            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                <FontAwesomeIcon icon={typeInfo.icon} className="text-4xl text-gray-200" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${typeInfo.color}`}>
                                                {typeInfo.label}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <time className="text-sm text-gray-400 mb-2 block">{post.date}</time>
                                        <h3 className="text-xl font-bold text-[#191F28] mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
                                            {post.content}
                                        </p>
                                        <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-blue-600">
                                            자세히 보기
                                            <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-[10px]" />
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                ) : (
                    // Empty State
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32 text-center"
                    >
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <FontAwesomeIcon icon={faInbox} className="text-3xl text-gray-200" />
                        </div>
                        <h3 className="text-xl font-bold text-[#191F28] mb-2">등록된 소식이 없습니다.</h3>
                        <p className="text-gray-400">새로운 소식이 준비되는 대로 알려드리겠습니다.</p>
                        {filter !== 'all' && (
                            <button 
                                onClick={() => setFilter('all')}
                                className="mt-6 text-blue-600 font-bold hover:underline"
                            >
                                전체 보기로 돌아가기
                            </button>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
