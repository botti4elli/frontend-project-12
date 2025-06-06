import React from 'react';
import {
  ListGroup, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../slices/channelsSlice';

const ChannelsList = ({
  channels, currentChannelId, onAddChannel, onRename, onRemove,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSelectChannel = (id) => dispatch(setCurrentChannelId(id));

  return (
    <div className="channels-sidebar">
      <div className="channels-header">
        <h5 className="mb-0">{t('channels')}</h5>
        <Button variant="outline-primary" size="sm" onClick={onAddChannel}>+</Button>
      </div>
      <div className="channels-list-wrapper">
        <ListGroup variant="flush">
          {channels.map((channel) => (
            <ListGroup.Item
              key={channel.id}
              onClick={() => handleSelectChannel(channel.id)}
              className={`d-flex justify-content-between align-items-center ${channel.id === currentChannelId ? 'active' : ''}`}
            >
              <span className="text-truncate">
                <span aria-hidden="true"># </span>
                {channel.name}
              </span>
              {channel.removable && (
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="link" size="sm" className="text-decoration-none text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => { e.stopPropagation(); onRename(channel); }}>
                      {t('channel.rename')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => { e.stopPropagation(); onRemove(channel); }}>
                      {t('channel.remove')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default ChannelsList;
