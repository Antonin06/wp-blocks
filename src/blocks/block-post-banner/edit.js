import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
  FocalPointPicker,
  PanelBody,
  RangeControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import './editor.scss';

export default function Edit(props) {
  const { attributes, setAttributes } = props;
  const { focalPoint = { x: 0.5, y: 0.5 }, imageHeight = 300 } = attributes;

  const blockProps = useBlockProps({
    style: {
      height: imageHeight + 'px',
      overflow: 'hidden',
    },
  });

  const featuredMediaId = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('featured_media'),
    []
  );

  const thumbnail = useSelect(
    (select) => {
      if (!featuredMediaId) {
        return null;
      }
      return select(coreStore).getMedia(featuredMediaId);
    },
    [featuredMediaId]
  );

  const onChangeImageHeight = (newHeight) => {
    setAttributes({ imageHeight: newHeight });
  };

  const onChangeFocalPoint = (newFocalPoint) => {
    setAttributes({ focalPoint: newFocalPoint });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Image Settings', 'my-plugin')}>
          {thumbnail && (
            <FocalPointPicker
              label={__('Focal Point', 'my-plugin')}
              url={thumbnail.source_url}
              value={focalPoint}
              onChange={onChangeFocalPoint}
              onDrag={onChangeFocalPoint}
              onDragStart={onChangeFocalPoint}
            />
          )}
          <RangeControl
            label={__('Image Height', 'my-plugin')}
            value={imageHeight}
            initialPosition={250}
            onChange={onChangeImageHeight}
            min={250}
            max={500}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        {thumbnail ? (
          <img
            src={thumbnail.source_url}
            alt={thumbnail.alt_text}
            style={{
              objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <p>{__('No thumbnail selected', 'my-plugin')}</p>
        )}
      </div>
    </>
  );
}
