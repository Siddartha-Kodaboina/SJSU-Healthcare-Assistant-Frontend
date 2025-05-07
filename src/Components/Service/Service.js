import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPills, faUserMd } from '@fortawesome/free-solid-svg-icons';

const Service = (props) => {
    const {name, description} = props.service;
    
    // Determine which icon to use based on the service name
    const getIcon = (serviceName) => {
        if (serviceName.includes('Health Records')) {
            return faFileUpload;
        } else if (serviceName.includes('Medication')) {
            return faPills;
        } else if (serviceName.includes('Health Profile')) {
            return faUserMd;
        }
    };
    
    // Split description into paragraphs for better readability
    const paragraphs = description.split('. ');
    
    return (
        <div className="col-md-4 mb-5">
            <div className="service-card text-center">
                <div className="service-icon">
                    <FontAwesomeIcon icon={getIcon(name)} className="fa-icon" />
                </div>
                <h4 className="service-title">{name}</h4>
                {paragraphs.map((paragraph, index) => (
                    <p key={index} className="service-description">
                        {paragraph}{index < paragraphs.length - 1 ? '.' : ''}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Service;