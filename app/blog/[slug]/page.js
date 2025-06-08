import { PortableText } from 'next-sanity';
import { client , urlFor } from '../../../app/lib/sanity';
import Image from 'next/image';
import '../../globals.css'
import Link from 'next/link';

export const revalidate = 30;
async function getData(slug) {
const query = `
  *[_type == "blog" && slug.current == '${slug}']{
    "currentSlug": slug.current,
    title,
    content,
    titleImage
  }[0]`;
  
  const data = await client.fetch(query , {slug});
  return data;
}

export default async function BlogArticles({ params }) {

  const data = await getData(params.slug);
    if (!data) return <div>Blog not found</div>;
  console.log(data)

  return (


  <div className="blog-wrapper">
      <h1>{data.title}</h1>

      {data.titleImage && (
        <Image
          src={urlFor(data.titleImage).url()}
          alt={data.title}
          width={600}
          height={400}
          className="blog-image"
        />
      )}

      <div className="blog-content">
        <PortableText value={data.content} />
      </div>

       <Link href="/contact" id="mail-link">Ask a Question</Link>

    </div>



  );
}
