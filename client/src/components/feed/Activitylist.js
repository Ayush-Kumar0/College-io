import React, { useEffect, useState } from 'react';
import Activities from './Activities';
import styled from 'styled-components';


const Activitylist = () => {
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        const url = `${process.env.REACT_APP_SERVER_URL}/feed/getFeeds`;
        fetch(url, { method: "GET", credentials: 'include' })
            .then(async res => {
                console.log(res);
                res = await res.clone().json();
                return res;
            })
            .then((result) => {
                console.log(result);
                setFeeds(result);
            })
            .catch(() => console.log(`Error while fetching feeds.`));
    }, []);

    return (
        <Container>
            <Activities activities={feeds} />
        </Container>
    );
};

const Container = styled.div`
    overflow-y: scroll;
    height: calc(100vh - 88px);
    min-height: 500px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`;

export default Activitylist;
