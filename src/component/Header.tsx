import style from "@/css/Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header() {



    return (
        <>
            <div className={style.navContainer}>
                <img src="/img/logo.png" alt="logo" />
                <div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="primary-text-1 cursor-pointer text-2xl md:text-3xl" />
                    <FontAwesomeIcon icon={faBars} className="primary-text-1 w-6 h-6 ml-2 cursor-pointer text-2xl md:text-3xl" />
                </div>
            </div>
        </>
    );
}