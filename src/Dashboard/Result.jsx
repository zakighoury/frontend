import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const App = () => (
    <Result
        status="warning"
        title="User does not have access to this page."
        extra={
            <Link to={'/'}>
                <Button type="primary" key="console">
                    Go Back
                </Button>
            </Link>
        }
    />
);

export default App;