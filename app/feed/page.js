async function getData(){
    const query = `*[_type == 'blog'] | order(_createdAt desc){
  title,
  smallDescription,
  "currentSlug": slug.current,
  titleImage
}`
const data  = await client.fetch(query);
return data;
}


import React from 'react'
import { client, urlFor } from '../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

export default async function Feed() {

    const data = await getData();
    console.log(data);

  return (

    <>
<div className="blog-grid">
  {data.map((post, index) => (
    <div className="blog-card" key={index}>
      <Image
        src={urlFor(post.titleImage).url()}
        width={500}
        height={350}
        alt={post.title}
        className="card-image"
      />
      <div className="card-content">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-description">{post.smallDescription}</p>
        <Link href={`/blog/${post.currentSlug}`}>
          <button className="read-more-btn">Read More</button>
        </Link>

      </div>
    </div>
  ))}
</div>


    


    </>

  )
}
