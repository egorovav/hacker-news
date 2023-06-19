import style from './NewsItem.module.css';

export function NewsItem(props) {
    const scoreClassArr = [style.score];

    if(props.score > 50) {
        scoreClassArr.push(style.highScore);
    } else if (props.score > 30) {
        scoreClassArr.push(style.midScore);
    } else {
        scoreClassArr.push(style.lowScore);
    }

    console.log(scoreClassArr);

    return (
        <div className={style.container}>
            <a className={style.link} href={props.url}>{props.title}</a>

            <div className={style.info}>
                <div className={style.userData}>
                    <span>{props.username} | </span>
                    <span>{props.date}</span>
                </div>

                <div className={scoreClassArr.join(' ')}>
                    {props.score} points
                </div>
            </div>
        </div>
    )
}