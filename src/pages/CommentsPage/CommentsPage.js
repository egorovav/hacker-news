import {Link, useParams} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {get} from "../../api/api";
import {useEffect, useState} from "react";
import {CommentsWrapper} from "../../components/Comments/CommentsWrapper";

export function CommentsPage() {
    const {id} = useParams();
    const [news, setNews] = useState();
    const[comments, setComments] = useState();

    async function getNewsData(newsId) {
        const newsData = await get(
            `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`);
        setNews(newsData);
        if(newsData?.kids) {
            const commentData = await getNewsComments(newsData.kids);
            setComments(commentData);
            console.log(commentData);
        }
    }

    async function getNewsComments(commentsIds) {
        return await Promise.all(commentsIds.map(async (id) => {
                const comment = await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                if (comment?.kids) {
                    comment.kids = await getNewsComments(comment.kids);
                }
                return comment
            })
        );
    }

    useEffect(() => {
        getNewsData(id);
    }, [id]);

    return (
        <div>
            <Link to='/'>Назад</Link>
            {news && (
                <NewsItem
                    title={news.title}
                    username={news.by}
                    date={news.time}
                    url={news.url}
                />
            )}

            {comments && (
                <CommentsWrapper comments={comments}/>
            )}
        </div>
    )
}