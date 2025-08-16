import Image from 'next/image';
import Link from 'next/link';
import errorImg from '../../public/assets/404 Error Page not Found with people connecting a plug-rafiki.svg'

const notFoundPage404 = () => {
    return (
<div className='mx-auto flex flex-col justify-center text-center my-30'>
            <div className='mx-auto'>
                <Image src={errorImg} alt="Error Image" width={300} height={200} />
            </div>

            <div className='mt-10 text-center mx-auto'> 
                <h2 className='text-2xl md:text-5xl lg:text-7xl'>404! Page not found!</h2>
                <Link href='/' className="btn btn-neutral mt-8">Go Back to Home</Link>
            </div>
        </div>
    );
};

export default notFoundPage404;