import style from './NewsItem.module.css';
import {Link} from "react-router-dom";
import {domainToHostname, openExternalUrl, unixToDate} from "../../utils/utils";

export function NewsItem(props) {
    const {className = '', title, username, date, score, url} = props;
    const scoreClassArr = [style.score];

    if(score > 50) {
        scoreClassArr.push(style.highScore);
    } else if (score > 30) {
        scoreClassArr.push(style.midScore);
    } else {
        scoreClassArr.push(style.lowScore);
    }

    return (
        <div className={`${style.container} ${className}`}>
            <Link to={`comments/${props.id}`} className={style.link}>{title}</Link>
            {/*<a className={style.link} href={url}>{title}</a>*/}

            <div className={style.info}>
                <div className={style.userData}>
                    <span>{username} | </span>
                    <span>{unixToDate(date)}</span>
                </div>

                {url ? (
                    <div className={style.externalLink}
                         onClick={() => openExternalUrl(url)}>{domainToHostname(url)}
                    </div>
                ) : (
                    <div className={scoreClassArr.join(' ')}>
                        {score} points
                    </div>
                )}

            </div>
        </div>
    )
}