import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { useCurrentIndex } from '../hooks/useCurrentIndex';
import { useMode } from '../hooks/useMode';
import { useSlidesProps } from '../hooks/useSlides';
import { useContentComponent } from '../hooks/useContentComponent';
import { useSidebarComponent } from '../hooks/useSidebarComponent';
import { useCommentsListComponent } from '../hooks/useCommentsListComponent';

export const AppContainer = ({ slides: originalSlides, hash }) => {
  const [isOpenSidebar, updateOpenSidebarStatus] = useState(false);
  const [currentIndex, setCurrentIndex] = useCurrentIndex();
  const { slides, contentsList } = useSlidesProps({ originalSlides, hash, currentIndex });
  const [mode, setMode] = useMode();
  const ContentComponent = useContentComponent(mode);
  const SidebarComponent = useSidebarComponent(mode);
  const CommentsListComponent = useCommentsListComponent(mode);

  const goTo = (num) => {
    if (window.slide) {
      window.slide.goToSlide(num);
      setCurrentIndex(num);
    }
  };

  const runPresentationMode = (type) => {
    window.slide = null;
    updateOpenSidebarStatus(false);
    setMode(type === 'start' ? 'host' : 'common');
  };

  return (
    <>
      {SidebarComponent && (
        <>
          <SidebarComponent
            goTo={goTo}
            isOpen={isOpenSidebar}
            terminate={() => runPresentationMode('terminate')}
            contents={contentsList}
            onStateChange={({ isOpen }) => updateOpenSidebarStatus(isOpen)}
            currentIndex={currentIndex}
            runPresentationMode={() => runPresentationMode('start')}
          />
          <MdMenu className="btn-sidebar" onClick={() => updateOpenSidebarStatus(true)} />
        </>
      )}
      {ContentComponent && (
        <ContentComponent
          hash={hash}
          slides={slides}
          isJumpPage={currentIndex !== 0}
          terminate={() => runPresentationMode('terminate')}
          currentIndex={currentIndex}
          onChangeSlideIndex={setCurrentIndex}
        />
      )}
      {CommentsListComponent && <CommentsListComponent />}
    </>
  );
};
