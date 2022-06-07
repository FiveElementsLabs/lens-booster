import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProfile } from '../api/profile/get-profile';

export default function ProfileView() {
    const { profileHandle } = useParams();
    const [profile, setProfile] = useState('');


    useEffect(() => {
        const loadData = async () => {
            try {
                console.log('load data');
                const data = await getProfile(profileHandle);
                setProfile(data);
                console.log(profile)

                console.log(data);
            } catch (err) {
                console.error('LOADING ERROR in ProfilePage: ', err?.message);
            }
        };
        loadData();
    }, [profile]);


    return (
        <>
            Profile View: {profileHandle}
        </>
    );
}
