import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import './Tags.css'

const Tags = () => {

    const tagsList = [{
        id: 1,
        tagName: "Javascript",
        tagDesc: "For question regarding programming"
    },{
        id: 2,
        tagName: "Python",
        tagDesc: "For question regarding programming"
    }]

    return (
        <div className='home-container-1'>
        <LeftSidebar />
        <div className="home-container-2">
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>A tag is a keyword or label that categorizes your question with other, similar questions.</p>
            <p className='tags-p'>Using the right tags makes it easier for others to find and answer to your question.</p>
            
            <div className="tags-list-container">
                {
                    tagsList.map((tag) => (
                        <TagsList tag={tag} key={tagsList.id} />
                    ))
                }
            </div>
            
        </div>
        </div>
    )
    }

export default Tags