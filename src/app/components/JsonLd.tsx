import React from 'react';

const JsonLd = () => {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'Hex Studio',
        'alternateName': ['Hex Studio Software', 'Hex Studio Yazılım'],
        'image': 'https://www.hexstudio.com.tr/app_icon_512.svg',
        'description': 'Hex Studio, cutting-edge AI solutions and software development agency in Malatya. | Hex Studio, Malatya merkezli ileri teknoloji yapay zeka ve yazılım geliştirme ajansı.',
        '@id': 'https://www.hexstudio.com.tr/#organization',
        'url': 'https://www.hexstudio.com.tr',
        'telephone': '',
        'email': 'hilaalkaramann@gmail.com',
        'address': {
            '@type': 'PostalAddress ',
            'addressLocality': 'Malatya',
            'addressCountry': 'TR'
        },
        'areaServed': [
            {
                '@type': 'City',
                'name': 'Malatya'
            },
            {
                '@type': 'City',
                'name': 'Istanbul'
            },
            {
                '@type': 'Country',
                'name': 'Turkey'
            }
        ],
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '39.5667',
            'longitude': '35.1667'
        },
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            'opens': '09:00',
            'closes': '18:00'
        },
        'sameAs': [
            'https://www.instagram.com/hexstudio',
            'https://www.linkedin.com/company/hexstudio'
        ],
        'priceRange': '$$'
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default JsonLd;
