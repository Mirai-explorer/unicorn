"use client"
import List from '@/components/Blog/List';
import Card from '@/components/Blog/Card';
import articles from '@/assets/data/articles';
import PictureViewer from "@/components/Blog/PictureViewer";
import React from 'react';
import { useEventEmitter } from 'ahooks';
import { EventEmitter } from "ahooks/lib/useEventEmitter";

const Blog = () => {
    const event$: EventEmitter<any> = useEventEmitter();
    return(
        <>
            <List>
                {articles.map((article) => (
                    <Card key={article.post.post_id} article={article} event$={event$} />
                ))}
            </List>
            <PictureViewer event$={event$}></PictureViewer>
        </>
    )
}

export default Blog;