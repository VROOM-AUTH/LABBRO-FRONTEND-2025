import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import TopNavigation from '../components/TopNavigation';
import RankTable from '../components/MarathonTable';
import SwitchComponent from '../components/Switch';

export default function Marathon() {
    const api = useAxios();
    const [threeFirstVroomVolts, setThreeFirstVroomVolts] = useState([]);
    const [threeFirstHours, setThreeFirstHours] = useState([]);
    const [selectedOption, setSelectedOption] = useState('vroomvolts');
    const [users, setUsers] = useState([]);

    const options = [
        { label: 'VroomVolts', value: 'vroomvolts' },
        { label: 'Hours', value: 'hours' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await getUsers();
            await getThreeFirstVroomVolts(usersData);
            await getThreeFirstHours(usersData);
        };
        fetchData();
    }, []);

    const getUsers = async () => {
        const response = await api.get('/users/');
        const usersData = response.data;
        if (usersData && Array.isArray(usersData)) {
            setUsers(usersData);
            console.log(usersData);
            return usersData;
        } else {
            console.log('No data found');
            return [];
        }
    };

    const getThreeFirstVroomVolts = async (usersData) => {
        const response = await api.get('/vroomvolts/latest');
        const vroomvolts = response.data;
        if (vroomvolts && Array.isArray(vroomvolts)) {
            const topThree = vroomvolts
                .sort((a, b) => b.value - a.value)
                .slice(0, 3);
            const topThreeWithUsernames = topThree.map((entry) => {
                const user = usersData.find((u) => u.id === entry.user);
                return {
                    username: user ? user.username : 'Unknown',
                    vroomvolts: entry.value,
                    id: entry.user,
                    image: user ? user.image : null,
                };
            });
            console.log(
                'Top Three by VroomVolts',
                topThreeWithUsernames,
                usersData
            );
            setThreeFirstVroomVolts(topThreeWithUsernames);
        }
    };

    const getThreeFirstHours = async (usersData) => {
        if (usersData && Array.isArray(usersData)) {
            const topThree = usersData
                .sort((a, b) => b.total_time - a.total_time)
                .slice(0, 3)
                .map((user) => {
                    return {
                        username: user.username,
                        hours: user.total_time,
                        id: user.id,
                        image: user.image,
                    };
                });
            console.log('Top Three by Hours', topThree);
            setThreeFirstHours(topThree);
        } else {
            console.log('No data found');
            return null;
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen text-white'>
            <TopNavigation />
            <div className='relative w-full flex justify-center items-center pb-5'>
                {/* Container for Switch and Table */}
                <div className='w-[600px] md:w-11/12 relative'>
                    {/* Switch Component Positioned Above */}
                    <div className='absolute top-3 -right-1.5 md:top-6 md:right-8'>
                        <SwitchComponent
                            options={options}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            size='small'
                        />
                    </div>

                    {/* Render Table */}
                    {selectedOption === 'vroomvolts' &&
                        threeFirstVroomVolts.length > 0 && (
                            <RankTable
                                data={threeFirstVroomVolts}
                                title='Top 3 '
                                dataKey='vroomvolts'
                            />
                        )}
                    {selectedOption === 'hours' &&
                        threeFirstHours.length > 0 && (
                            <RankTable
                                data={threeFirstHours}
                                title='Top 3 '
                                dataKey='hours'
                            />
                        )}
                </div>
            </div>
        </div>
    );
}
