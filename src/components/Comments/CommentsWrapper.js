import style from './Comments.module.css'
import {unixToDate} from "../../utils/utils";

export function CommentsWrapper({comments}) {
    return(
        <div className={style.container}>
            <Comments comments={comments}/>
        </div>
    )
}

function Comments({comments}) {
    return (
        <>
        {comments.map((commentItem) => (
            <div key={commentItem.id} className={style.commentContainer}>
                <div className={style.commentUsername}>{commentItem.by}</div>
                <div className={style.commentText}>{commentItem.text}</div>
                <div className={style.commentBottom}>
                    <div className={style.commentTime}>{unixToDate(commentItem.time)}</div>
                    {commentItem?.kids?.length &&
                        (<button className={style.commentReplyButton}>Ответы</button>)}
                </div>

                {
                    commentItem?.kids?.length && (
                        <div className={style.commentSubComment}>
                            <Comments comments={commentItem.kids}/>
                        </div>
                    )

                }
            </div>
        ))}

        </>
    )
}