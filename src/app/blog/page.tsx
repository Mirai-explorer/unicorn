"use client"
import List from '@/components/Blog/List';
import Card from '@/components/Blog/Card';
import articles from '@/assets/data/articles';
import PictureViewer from "@/components/Blog/PictureViewer";
import React from 'react';

const Blog = () => {
    return(
        <>
            <List>
                {articles.map((article) => (
                    <Card key={article.post.post_id} article={article} />
                ))}
            </List>
            <PictureViewer></PictureViewer>
        </>
    )
}

export default Blog;