import style from "@/css/Index.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <>
            <div className={style.videoContainer}>
                <video autoPlay loop muted src={"/vid/mainVideo.mp4"}></video>
            </div>
            <div className={style.floatArrow}>
                <FontAwesomeIcon icon={faArrowDown} beatFade={true} className={"text-xl sm:text-2xl md:text-3xl xl:text-4xl text-gray-400"}/>
            </div>
            <div className={style.contentContainer}>
                <div className={"primary-bg-1 flex justify-evenly text-white"}>
                    <div>zz</div>
                    <div>ss</div>
                    <div>dd</div>
                </div>
                <div className={"primary-bg-2 flex justify-around text-white"}>
                    <div>zz</div>
                    <div>ss</div>
                    <div>dd</div>
                </div>
                <div className={"primary-bg-3 flex justify-between text-white"}>
                    <div>ss</div>
                    <div>dd</div>
                </div>
            </div>
        </>
    );
}
