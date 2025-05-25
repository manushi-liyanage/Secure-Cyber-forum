import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar';
import { Search } from 'lucide-react';


export default function Home(){
    const navigate = useNavigate();
    return(
        <>
         <Navbar/>
         <section className="bg-gray dark:bg-gray-900">
          
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <div className="lg:col-span-7 mb-6">
                        <div className="relative flex items-center bg-gray dark:bg-gray-900 border border-gray-500 pl-7 pr-7 pb-3 pt-3 rounded-2xl w-4/5 min-w-fit">
                            <Search />
                            <input
                                type="text"
                                placeholder="Search News and blogs per your need.."
                                className="bg-gray dark:bg-gray-900 w-full pl-3 font-thin text-gray-400"
                            />
                        </div>
                    </div>
                </div>


    


          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
             <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Stay Updated <br></br>Stay Connected</h1>
             <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Empowering cybersecurity awareness through collaboration, knowledge sharing, and real-time updates-stay informaed, stay secure,stay ahead of cyber threats.</p>
             <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Explore News
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
             </a>
             <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Join us Now
             </a> 
            </div>
         <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            {/* <img src="/src/images/herosection.png" alt="mockup"/> */}
         </div>                
        </div> 
      
  
   </section>

        </> 
    )
}

