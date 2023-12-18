import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import NotificationHook from '../../Hooks/NotificationHook';
import NotificationCard from '../../Components/NotificationCard';
import {Notification} from 'iconsax-react-native';
import AppText from '../../Components/AppText';
import CommonMethods from '../../Utils/CommonMethods';
import {formatDate} from '../../Utils/DateSerices';

const NotificationScreen = ({navigation}: any) => {
  const {
    unreadCount,
    getunreadCount,
    getNotifications,
    notifications,
    handleMarkNotificationAsRead,
    handleClearAllNotifications,
  } = NotificationHook();
  useEffect(() => {
    getNotifications();
    getunreadCount();
  }, []);

  return (
    <>
      <SubHeader
        middleText={true}
        title="Notifications"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View style={[styles.container, {backgroundColor: colors.primaryBg}]}>
          <FlatList
            indicatorStyle="black"
            data={notifications}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 60,
            }}
            keyExtractor={(item: any) => item?.message_id?.toString()}
            renderItem={({item}: any) => (
              <NotificationCard
                // uri={item.data.policy.imageUrls[0]}
                heading={item.data.body}
                dateTime={`${formatDate(item.date)}`}
                opened={item?.opened}
                // onPress={() => {
                //   if (!item?.opened) {
                //     CommonMethods.markNotificationAsOpened(
                //       item?.message_id,
                //     ).then(() => {
                //       CommonMethods.handleClickedNotitfaction(item);
                //       getNotifications();
                //     });
                //   }
                // }}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyComponentContainer}>
                <Notification
                  variant="Linear"
                  color={colors.primaryText}
                  size={60}
                />
                <AppText
                  fontSize={23}
                  color="primaryText"
                  fontFamily="Gilroy-Medium"
                  style={{paddingTop: 20}}>
                  You have no Notifications
                </AppText>
              </View>
            )}
          />
        </View>
        {notifications.length > 0 && (
          <View
            style={[styles.bottomButtons, {backgroundColor: colors.primaryBg}]}>
            <TouchableOpacity onPress={handleClearAllNotifications}>
              <AppText fontFamily="Gilroy-Bold" color="danger">
                Clear All
              </AppText>
            </TouchableOpacity>

            {unreadCount > 0 && (
              <TouchableOpacity onPress={handleMarkNotificationAsRead}>
                <AppText fontFamily="Gilroy-Bold" color="primaryText">
                  Mark all as read
                </AppText>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  bottomButtons: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  emptyComponentContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: '50%',
  },
});
