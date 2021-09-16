import { useEvent } from '@pulsejs/react';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { icons } from '../assets';
import { colors, typography } from '../atoms/constans';
import { ALERT, IAlert } from '../core/events';

interface IPayload extends IAlert {
  progress: number,
  key: string,
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<IPayload[]>(() => []);
  const requestRef = useRef<any>();

  useEvent(ALERT, (payload) => {
    setNotifications((old) => [...old, {
      ...payload,
      progress: 100,
      key: Math.random().toString(36).substr(2, 9),
    }]);
  });

  useEffect(() => {
    requestRef.current = requestAnimationFrame(checkProgress);
    return () => cancelAnimationFrame(requestRef.current);
  }, [])

  const animations = {
    layout: true,
    initial: { x: 450 },
    exit: { opacity: 0 },
    animate: { x: 0 },
  };

  function removeIndex(key: string): void {
    setNotifications((old) => [...old.filter((x) => x.key !== key)]);
  }

  function getColor(type: string): string {
    return type === 'error' ? colors.RED : type === 'success' ? colors.GREEN : colors.INFO
  }

  function checkProgress() {
    setNotifications((old) => [...old.map((notification) => {
      notification.progress -= .25;
      if (notification.progress <= 0) {
        removeIndex(notification.key);
      }
      return notification;
    })]);

    requestRef.current = requestAnimationFrame(checkProgress);
  }

  return (
    <Wrapper>
      <AnimatePresence>
        {notifications.map(({ title, message, type, progress, key }) => 
          <Notification key={key} {...animations} color={getColor(type)}>
            <UpperSection>
              <Icon color={getColor(type)}>
                {type === 'error' && <icons.error />}
                {type === 'success' && <icons.check />}
                {type === 'info' && <icons.info />}
              </Icon>
              <Details>
                <Title>{title}</Title>
                {message && 
                  <typography.p>{message}</typography.p>
                }
              </Details>
            </UpperSection>
            <Progress style={{ width: `${progress}%` }} color={getColor(type)} />
            <Closer onClick={() => removeIndex(key)}>
              <icons.error />
            </Closer>
          </Notification>
        )}
      </AnimatePresence>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: 1rem;
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  max-height: calc(100vh - 1rem);
`;
  
const Notification = styled(motion.div)<{ color?: string }>`
  background: ${colors.SEC_BG};
  padding: 1.25rem 0 0 0;
  border-radius: 5px;
  width: 100%;
  display: grid;
  grid-template-rows: auto 2px;
  box-shadow: ${colors.BOX_SHADOW};
  position: relative;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const Icon = styled('span')<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};

  svg {
    width: 30px;
    height: 30px;
  }
`;

const Details = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled(typography.h4)`
  font-weight: 500;
  font-size: 1.6rem;
`;

const Progress = styled('div')<{ color: string }>`
  height: 100%;
  background: ${({ color }) => color};
`;

const UpperSection = styled('div')`
  display: grid;
  grid-template-columns: 50px auto;
  grid-gap: 1rem;
  padding: 0 .75rem 1.25rem .75rem;
`;

const Closer = styled.span`
  position: absolute;
  top: .5rem;
  right: .5rem;
  cursor: pointer;

  svg {
    color: ${colors.SEC_TEXT_COLOR};
    width: 15px ;
    height: 15px  ;
  }
`;

export default Notifications;