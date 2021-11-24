import React, { useState } from 'react'
import { TouchableOpacity,Modal, Text, View, ScrollView } from 'react-native'
import Icon from '../../Utils/Icon';
import styles from './styles';
import PropTypes from 'prop-types'
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/core';

const AppModal = ({
    modalVisible,
    title,
    navigateName,
    setModalVisible,
    modalBody,
    modalFooter,
    closeOnTouchOutside
}) => {
  const {navigate}= useNavigation();
    return (
        <Modal visible={modalVisible} transparent>
            <TouchableOpacity style={styles.wrapper} 
            onPress={()=>{
              if(closeOnTouchOutside){
              setModalVisible(false)
            {navigateName?navigate(navigateName):null}
          }
            }}
            >
              <View style={styles.modalView}>
                <ScrollView>

                <View style={styles.headerModal}>
                  <TouchableOpacity onPress={()=>{
                    setModalVisible(false);
                   navigateName? navigate(navigateName):null;
                    }}>
                  <Icon name='cross' type='entypo' size={25} color={Colors.secondary} />  
                  </TouchableOpacity>
                <Text style={styles.title}>{title || 'Carsist'}</Text>
                <Icon name='file' />
                
                </View>
        
          <View style={styles.footerSeparator} />

            <View style={styles.body}>{modalBody}</View>
            {modalFooter}

            {!modalFooter && (
              <View>
                <>
                  <View style={styles.footerSeparator} />
                  <View style={styles.footerItems}>
                    <View style={styles.footer}>
                      <Text style={styles.footerText}>Privacy Policy</Text>
                      <View style={styles.termsView} />
                      <Text style={styles.footerText}>Terms of Service</Text>
                    </View>
                  </View>
                </>
              </View>
            )}

            </ScrollView>
                </View>

         </TouchableOpacity>
        </Modal>
    )
};
AppModal.propTypes = {
  closeOnTouchOutside: PropTypes.bool,
};

AppModal.defaultProps = {
  closeOnTouchOutside: true,
};

export default AppModal;

