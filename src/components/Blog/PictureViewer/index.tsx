import React from 'react';
import Image from 'next/image';
import Loading from "@/app/blog/loading";
import {useEvent} from "@/components/Hooks/useEvent";

type imageType = {
    url: string,
    height: number,
    width: number,
    format: string,
    size: string,
    crop: string | null,
    is_user_set_cover: boolean,
    image_id: string,
    entity_type: string,
    entity_id: string
}

const PictureViewer = () => {
    const { state, dispatch } = useEvent();
    const images = state.images || [];
    const viewed = state.viewed || false;

    const Viewer = () => {
        dispatch({ type: 'viewed', payload: false });
    };

    return (
        <div
            className={`absolute top-0 left-0 w-full h-full z-[999] overflow-hidden bg-[#000000] opacity-80 ${
                viewed ? 'block' : 'hidden'
            }`}
            onClick={Viewer}
            onTouchStart={Viewer}
        >
            <div className="scroll-wrap">
                <div className="scroll-container">
                    {images.map((item: any, index: number) => (
                        <div className="scroll__item" key={index}>
                            <Image src={item.url} alt="a blog image" width={300} height={300} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TriggerButton = () => {
    const { dispatch } = useEvent();

    const triggerView = () => {
        dispatch({
            type: 'images',
            payload: [
                { url: 'https://via.placeholder.com/300', image_id: '1' },
                { url: 'https://via.placeholder.com/300', image_id: '2' },
            ],
        });
        dispatch({ type: 'viewed', payload: true });
    };

    return <button onClick={triggerView}>Open Viewer</button>;
};

export default PictureViewer;