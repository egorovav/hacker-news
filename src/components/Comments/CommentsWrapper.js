import style from './Comments.module.css'
import {copy, unixToDate} from "../../utils/utils";
import {useState} from "react";
import {get} from "../../api/api";

export function CommentsWrapper({comments}) {
    const [openedComments, setOpenedComments] = useState({});

    return(
        <div className={style.container}>
            <Comments comments={comments} openedComments={openedComments} onExpandComments={setOpenedComments}/>
        </div>
    )
}

function Comments({comments, openedComments, onExpandComments}) {
    const[subComments, setSubComments] = useState();
    async function expandComment(comment) {

        const subComments = await Promise.all(comment.kids?.map(async (id) => {
            return get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        }))
        setSubComments(subComments)

        const copyOpenedComments = copy(openedComments);

        if (openedComments[comment.id]) {
            delete copyOpenedComments[comment.id];
        } else {
            copyOpenedComments[comment.id] = {};
        }

        onExpandComments(copyOpenedComments, subComments);
    }

    function expandSubComments(comment, subOpenedComments) {
        const copyOpenedComments = copy(openedComments);
        copyOpenedComments[comment.id] = subOpenedComments;
        onExpandComments(copyOpenedComments);
    }

    return (
        <>
        {comments.map((commentItem) => (
            <div key={commentItem.id} className={style.commentContainer}>
                <div className={style.commentUsername}>{commentItem.by}</div>
                <div className={style.commentText}>{commentItem.text}</div>
                <div className={style.commentBottom}>
                    <div className={style.commentTime}>{unixToDate(commentItem.time)}</div>
                    {commentItem?.kids?.length &&
                        (<button onClick={() => expandComment(commentItem)} className={style.commentReplyButton}>Ответы</button>)}
                </div>

                {
                    commentItem?.kids?.length && openedComments[commentItem.id] && (
                        <div className={style.commentSubComment}>
                            <Comments comments={subComments} openedComments={openedComments[commentItem.id]}
                                      onExpandComments={(subComments) => expandSubComments(commentItem, subComments)}/>
                        </div>
                    )

                }
            </div>
            ))}

        </>
    )
}