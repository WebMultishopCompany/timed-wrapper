import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, DateTimePicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('timed-gutenberg-wrapper/block', {
    title: __('Timed Wrapper', 'timed-gutenberg-wrapper'),
    icon: 'admin-page',
    category: 'layout',
    attributes: {
        startDateTime: {
            type: 'string',
            default: ''
        },
        endDateTime: {
            type: 'string',
            default: ''
        }
    },
    edit: (props) => {
        const { attributes: { startDateTime, endDateTime }, setAttributes } = props;

        const onChangeStartDateTime = (newDateTime) => {
            setAttributes({ startDateTime: newDateTime });
        };

        const onChangeEndDateTime = (newDateTime) => {
            setAttributes({ endDateTime: newDateTime });
        };

        return (
            <div className="timed-wrapper">
                <InspectorControls>
                    <PanelBody title={__('Visibility Settings', 'timed-gutenberg-wrapper')}>
                        <label>{__('Start Date and Time', 'timed-gutenberg-wrapper')}</label>
                        <DateTimePicker
                            currentDate={startDateTime}
                            onChange={onChangeStartDateTime}
                            is12Hour={false}  // Set to false for 24-hour format
                        />
                        <label>{__('End Date and Time', 'timed-gutenberg-wrapper')}</label>
                        <DateTimePicker
                            currentDate={endDateTime}
                            onChange={onChangeEndDateTime}
                            is12Hour={false}  // Set to false for 24-hour format
                        />
                    </PanelBody>
                </InspectorControls>
                <InnerBlocks />
            </div>
        );
    },
    save: (props) => {
        const { attributes: { startDateTime, endDateTime } } = props;
        return (
            <div className="timed-wrapper" data-start={startDateTime} data-end={endDateTime}>
                <InnerBlocks.Content />
            </div>
        );
    },
});
