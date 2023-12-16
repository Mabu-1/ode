
import { MdEmail } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Footer = () => {


    return (
        <div>
            <div className='h-fit bg-black' >
                <div className='bg-no-repeat bg-center bg-cover text-white p-8'>
                    <div className='flex justify-between flex-col gap-20 lg:flex-row w-3/4 mx-auto'>
                        <div className='flex-row'>
                            <div className='flex items-center '>
                                <h1 className='text-5xl text-red-600'>ODE</h1>
                            </div>
                            <div>
                                <ul className='mt-[30px] flex flex-col gap-2'>

                                    <li className='flex gap-2 items-center'><BsTelephoneFill className='text-[#2cae74] text-2xl' /><p>+8 (800) 238 9997 (admin)</p></li>
                                    <li className='flex gap-2 items- center'><MdEmail className='text-[#2cae74] text-2xl' /><p>ode77@gmail.com</p></li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-4xl mt-5 mb-8 font-semibold text-[#7207ff] '>Pages</h2>
                            <li><Link className="text-blue-300 text-lg font-bold" to='/apartment'>Home</Link></li>
                          
                           
                           
                        </div>
                        <div>
                            <h2 className='font-semibold text-4xl  mt-5 mb-3 text-[#3d07ff]'>Social Links</h2>
                            <p>You can find us from social links given below</p>
                            <div className='flex gap-3 mt-8'>
                                <FaFacebookSquare className='text-[#1d1ddd] text-4xl' />
                                <RiInstagramFill className='text-[#d71ddd] text-4xl' />
                                <FaYoutube className='text-[#dd1d1d] text-4xl' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='bg-black text-[#1d1ddd] p-3 text-center'>
                <p>© ResiCraft  2023 | Created by <span>Team ODE</span></p>
            </div>
        </div>
    );
};

export default Footer;
