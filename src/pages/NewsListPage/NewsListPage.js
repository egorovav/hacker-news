import {useEffect, useState} from "react";
import {get} from "../../api/api";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import style from './NewsListPage.module.css'

export function NewsListPage() {
    const [news, setNews] = useState([]);

    useEffect(() => { getNewsList() }, []);

    async function getNewsList() {
        const newsIds = await get(
            'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=10')


        const newsList = await Promise.all(newsIds.map((id) =>
            get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`))
        );

        setNews(newsList);
    }

    return (
        <>
            <div>Колличество новостей: {news.length}</div>
            {
                news.map(item => {
                    return (<NewsItem
                            className={style.newsItem}
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            username={item.by}
                            date={item.time}
                            score={item.score}
                        />
                    )
                })
            }
        </>
    );
}