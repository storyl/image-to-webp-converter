import Head from 'next/head';
import ImageUploader from '../components/ImageUploader';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Image to WebP Converter</title>
        <meta name="description" content="Convert images to WebP format" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          <span className="text-blue-600">Image to WebP Converter</span>
        </h1>

        <p className="mt-3 text-2xl">
          Select an image to convert and download it in WebP format
        </p>
        <p className="mt-3 text-xl">
          5MB file size limit on web - 50MB file size limit locally
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <ImageUploader />
        </div>
      </main>

      
    </div>
  );
}