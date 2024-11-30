import React from 'react';
import TopNavigation from '../components/TopNavigation';

const Calendar = () => {
    return (
        <div className='flex flex-col justify-start items-center mx-4 md:mt-4 bg-[#190C34] rounded-2xl shadow-lg'>
            <TopNavigation />
            <div className='text-2xl font-bold py-3 md:py-6 bg-[#473663] rounded-t-2xl w-full text-center'>
                Team Events Calendar
            </div>
            <div className='p-4 w-1000'>
                <iframe
                    src='https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAthens&showPrint=0&title=Vroom&showTz=0&src=dDZoZ2RtZmRlbHBuOTFpbWo3MHA5ZHFjdWdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%238E24AA://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAthens&showPrint=0&title=Vroom&src=dDZoZ2RtZmRlbHBuOTFpbWo3MHA5ZHFjdWdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%238E24AA://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAthens&showPrint=0&title=Vroom&src=YWdpcy5udGFuQGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=dDZoZ2RtZmRlbHBuOTFpbWo3MHA5ZHFjdWdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZWwuZ3JlZWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23616161&color=%2333B679&color=%238E24AA&color=%23009688'
                    style={{
                        border: 0,
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }}
                    width='1000'
                    height='600'
                ></iframe>
            </div>
        </div>
    );
};

export default Calendar;
