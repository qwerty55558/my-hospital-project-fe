"use client"

import style from "@/css/Index.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
import {useEffect, useRef, useState} from "react";

const DOCTORS = [
    {
        name: "Dr. John Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel luctus leo. Nulla imperdiet pretium ex, pharetra vehicula velit tincidunt eu. Etiam non dolor consectetur, vulputate ante non, feugiat magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc et turpis porta, accumsan urna in, pretium enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec vestibulum dui, vel placerat quam. Quisque vitae eleifend quam. Fusce neque leo, tempus non vehicula id, faucibus id elit.",
        imageSrc: "/img/profile_doctor-1.jpg",
        bgClass: "primary-bg-1", // 배경색 클래스
    },
    {
        name: "Dr. Jane Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel luctus leo. Nulla imperdiet pretium ex, pharetra vehicula velit tincidunt eu. Etiam non dolor consectetur, vulputate ante non, feugiat magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc et turpis porta, accumsan urna in, pretium enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec vestibulum dui, vel placerat quam. Quisque vitae eleifend quam. Fusce neque leo, tempus non vehicula id, faucibus id elit.",
        imageSrc: "/img/profile_doctor-3.jpg",
        bgClass: "primary-bg-2",
    },
    {
        name: "Dr. James Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel luctus leo. Nulla imperdiet pretium ex, pharetra vehicula velit tincidunt eu. Etiam non dolor consectetur, vulputate ante non, feugiat magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc et turpis porta, accumsan urna in, pretium enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec vestibulum dui, vel placerat quam. Quisque vitae eleifend quam. Fusce neque leo, tempus non vehicula id, faucibus id elit.",
        imageSrc: "/img/profile_doctor-2.jpg",
        bgClass: "primary-bg-3",
    },
    {
        name: "Dr. Jenny Doe",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel luctus leo. Nulla imperdiet pretium ex, pharetra vehicula velit tincidunt eu. Etiam non dolor consectetur, vulputate ante non, feugiat magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc et turpis porta, accumsan urna in, pretium enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec vestibulum dui, vel placerat quam. Quisque vitae eleifend quam. Fusce neque leo, tempus non vehicula id, faucibus id elit.",
        imageSrc: "/img/profile_doctor-4.jpg",
        bgClass: "primary-bg-4",
    },
];

function DoctorCard({doctor, isReversed}: { doctor: any; isReversed: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if(ref.current){
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    },[]);

    return (
        <div className={`relative ${doctor.bgClass}`}>
            <div
                ref={ref}
                className={`
             transform transition-all duration-700 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
            flex ${isReversed ? "flex-row-reverse" : "flex-row"} justify-between text-white p-10 gap-3`}>
                <div className={"flex flex-col flex-1 wrap-break-word whitespace-break-spaces justify-center"}>
                    <div>
                        <h2 className={"text-2xl font-semibold"}>{doctor.name}</h2>
                        <h3 className={"text-xl font-light mt-2"}>{doctor.description}</h3>
                    </div>
                </div>

                <div className={style.doctorProfilePic}>
                    <Image
                        src={doctor.imageSrc}
                        alt={doctor.name}
                        fill
                        className="object-cover rounded-3xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <>
            <div className={style.videoContainer}>
                <video autoPlay loop muted src={"/vid/mainVideo.mp4"}></video>
                <span className={style.floatCenterText}>
                    <h1 className={"text-white/80 text-4xl md:text-6xl xl:text-8xl whitespace-nowrap font-light"}>
                        Welcome to <br/>
                        My Hospital Project
                    </h1>
                </span>
            </div>
            <div className={style.floatArrow}>
                <FontAwesomeIcon icon={faArrowDown} beatFade={true}
                                 className={"text-xl sm:text-2xl md:text-3xl xl:text-4xl text-gray-400"}/>
            </div>
            <div className={style.contentContainer}>
                {DOCTORS.map((doctor, index) => (
                    <DoctorCard
                        key={index}
                        doctor={doctor}
                        isReversed={index % 2 !== 0}
                    />
                ))}
            </div>

            <div className={"primary-bg-5 h-[33vh]"}>
                dddds
            </div>
            <div className={"h-[33vh]"}></div>
        </>
    );
}
