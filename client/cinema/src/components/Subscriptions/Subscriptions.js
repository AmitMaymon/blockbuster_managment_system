import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllSubscription from './AllSubscription';
import EditMember from './EditMember';
import axios from 'axios';
import AddMember from './AddMember';

function Subscriptions(props) {
    const [selectedButton, setSelectedButton] = useState('All Members');
    const hasAccess = useSelector(state => state.view_subscription)
    const addMemberPermission = useSelector(state => state.create_subscription)
    const routed = useSelector(state => state.routed)
    const selectedMember = useSelector(state => state.selected_member)
    const dispatch = useDispatch()

    const NoAccess = () => {

        return (
            <div>
                <h1>Access denied</h1>
            </div>
        );
    }

    useEffect(() => {
        if (!hasAccess) {
            setSelectedButton('No Access')
        }
        const routeMember = async () => {
        
            dispatch({ type: 'ROUTED', payload: false })
            const token = document.cookie.split('=')[1]
            const {data} = await axios.get(`http://127.0.0.1:5000/members/${selectedMember}`, { headers: { 'Authorization': `Bearer ${token}` } })
            cb('Edit Member', data[0])

        }

        if (routed) {
            routeMember()
        }


    }, [])

    const cb =  (text, member) => {
        if (member) {
            dispatch({ type: 'SELECTED_MEMBER', payload: member })
        }
        setSelectedButton(text)
        

    }







    return (
        <div>
            <h1>Subscriptions</h1><br />
            {
                hasAccess ?
                    <button
                        style={selectedButton === 'All Members' ? { backgroundColor: 'yellow' } : {}}
                        onClick={() => setSelectedButton('All Members')}
                    >All Members</button> :
                    NoAccess()

            }
            &nbsp;
            {
                addMemberPermission &&

                <button
                    style={selectedButton === 'Add Member' ? { backgroundColor: 'yellow' } : {}}
                    onClick={() => setSelectedButton('Add Member')}
                >Add Member</button>
            }
            &nbsp;
            <button
                style={selectedButton === 'Edit Member' ? { backgroundColor: 'yellow', display: 'inline' } : { display: 'none' }}
                onClick={() => setSelectedButton('Edit Member')}
            >
                Edit Member
            </button>

            {
                selectedButton === 'All Members' &&
                <AllSubscription cb={cb} mainCB={props.mainCB} />
            }
            {
                selectedButton === 'Add Member' &&
                <AddMember cb={cb} />
            }
            {
                selectedButton === 'Edit Member' &&
                <EditMember cb={cb} />
            }


        </div>
    );
}

export default Subscriptions;