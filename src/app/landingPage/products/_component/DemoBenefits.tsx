import React from 'react';

type DemoType = 'virtual' | 'appointment' | 'support' | 'sales';

interface DemoBenefitsProps {
    type: DemoType;
}

const DemoBenefits: React.FC<DemoBenefitsProps> = ({ type }) => {
    const types = {
        virtual: {
            name: 'Virtual Assistant',
            description: 'A virtual assistant designed to help users with their daily tasks.',
            Capabilities: [
                'Engage customers seamlessly via chatbots and voice assistants.',
                'Provide accurate solutions to common problems in real-time.'
            ],
            Applications: [
                'Manage customer support requests with ease.',
                'Real-Time Assistance',
                'Offer instant help directly on your platform.',
                'Enhance user experience with fast, precise responses.'
            ],
            features: ['AI-powered', 'Conversational', 'Customizable', 'Message broadcasting'],
            rating: 4.5
        },
        appointment: {
            name: 'Appointment Manager',
            description: 'Manage appointments efficiently and reduce scheduling conflicts.',
            Capabilities: [
                'Proactive Scheduling: Automatically set appointments based on user availability.',
                'Efficient Rescheduling: Adjust appointments dynamically without manual intervention.'
            ],
            Applications: [
                'Streamlining Schedules: Minimize time wasted in managing appointments.',
                'Real-Time Notifications: Send reminders and updates instantly.',
                '24/7 Availability: Always ready to schedule.',
                'Improved Productivity: Focus on tasks that matter.'
            ],
            features: ['Automated', 'Efficient', 'User-friendly'],
            rating: 4.2
        },
        sales: {
            name: 'Sales Assistant',
            description: 'Boost sales performance with intelligent automation tools.',
            Capabilities: [
                'Lead Management: Track and follow up with leads effectively.',
                'Analytics Integration: Understand customer behavior through actionable insights.'
            ],
            Applications: [
                'Enhanced Outreach: Target customers with personalized offers.',
                'Real-Time Reporting: Measure success instantly.',
                'Automation: Reduce repetitive sales tasks.',
                'Revenue Growth: Drive higher conversions.'
            ],
            features: ['Data-driven', 'Insightful', 'Customizable'],
            rating: 4.6
        },
        support: {
            name: 'Support Assistant',
            description: 'Deliver exceptional support experiences with minimal effort.',
            Capabilities: [
                'Proactive Assistance: Solve customer issues before they arise.',
                'Knowledge Base Management: Provide quick answers to common queries.'
            ],
            Applications: [
                'Customer Retention: Keep users satisfied with timely support.',
                '24/7 Support: Be available whenever your customers need you.',
                'Streamlined Operations: Reduce workload for human agents.',
                'Enhanced Satisfaction: Build trust and loyalty.'
            ],
            features: ['Responsive', 'Reliable', 'AI-enabled'],
            rating: 4.8
        }
    };

    const selectedType = types[type];

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div>
                <h3 style={{fontSize: '1.7rem', fontWeight: 600}}>{selectedType.name}</h3>
                <p>{selectedType.description}</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
                <div>
                    <p style={{fontSize: '1.5rem', fontWeight: 600}}>Capabilities</p>
                    <ul style={{display: 'flex', flexDirection: 'column', gap: '.5rem', paddingLeft: '.5rem'}}>
                        {selectedType.Capabilities.map((items, index) => <li key={index}> {items} </li>)}
                    </ul>
                </div>
                <div>
                    <p style={{fontSize: '1.5rem', fontWeight: 600}}>Applications</p>
                    <ul style={{display: 'flex', flexDirection: 'column', gap: '.5rem', paddingLeft: '.5rem'}}>
                        {selectedType.Applications.map((items, index) => <li key={index}> {items} </li>)}
                    </ul>
                </div>
                <div>
                    <p style={{fontSize: '1.5rem', fontWeight: 600}}>Features</p>
                    <ul style={{display: 'flex', flexDirection: 'column', gap: '.5rem', paddingLeft: '.5rem'}}>
                        {selectedType.features.map((items, index) => <li key={index}> {items} </li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DemoBenefits;
