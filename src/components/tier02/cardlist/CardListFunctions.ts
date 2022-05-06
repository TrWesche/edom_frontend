import { EquipListProps, UserListProps, GroupListProps, RoomListProps } from "./CardListInterfaces";
import { CardDataProps, CardSettingProps } from "../../tier03/cards/_interfaceCardProps";

export const buildEquipCardContentList = (
    cardSettings: CardSettingProps,
    data: EquipListProps ) => 
{
    const retList: any = [];
    if (!data.equip) {
        return retList;
    };

    data.equip.forEach(element => {
        const cardInstanceData: CardDataProps = {
            editAllowed: element.edit_permissions || false,
            editButtonDestination: `/equip/${element.id}` || `#`,
            actionAreaDestination: `/equip/${element.id}` || `#`,
            mediaURI: element.image_url || `Image Not Found`,
            mediaAltText: element.image_alt_text ? element.image_alt_text : "Image Description Not Found",
            contentTexts: [
                {textVariant: "h5", textContent: element.name ? element.name : ""}, 
                {textVariant: "body2", textContent: element.headline ? element.headline : ""}, 
            ]
        };

        retList.push({
            settings: cardSettings,
            data: cardInstanceData
        });
    });

    return retList;
};



export const buildGroupCardContentList = (
    cardSettings: CardSettingProps,
    data: GroupListProps ) => 
{
    const retList: any = [];
    if (!data.group) {
        return retList;
    };


    data.group.forEach(element => {
        const cardInstanceData: CardDataProps = {
            editAllowed: element.edit_permissions || false,
            editButtonDestination: `/groups/${element.id}` || `#`,
            actionAreaDestination: `/groups/${element.id}` || `#`,
            mediaURI: element.image_url || `Image Not Found`,
            mediaAltText: element.image_alt_text ? element.image_alt_text : "Image Description Not Found",
            contentTexts: [
                {textVariant: "h5", textContent: element.name ? element.name : ""}, 
                {textVariant: "body2", textContent: element.headline ? element.headline : ""}, 
            ]
        };

        retList.push({
            settings: cardSettings,
            data: cardInstanceData
        });
    });

    return retList;
};



export const buildRoomCardContentList = (
    cardSettings: CardSettingProps,
    data: RoomListProps ) => 
{
    const retList: any = [];
    if (!data.rooms) {
        return retList;
    };

    data.rooms.forEach(element => {
        const cardInstanceData: CardDataProps = {
            editAllowed: element.edit_permissions || false,
            editButtonDestination: `/rooms/${element.id}` || `#`,
            actionAreaDestination: `/rooms/${element.id}` || `#`,
            mediaURI: element.image_url || `Image Not Found`,
            mediaAltText: element.image_alt_text ? element.image_alt_text : "Image Description Not Found",
            contentTexts: [
                {textVariant: "h5", textContent: element.name ? element.name : ""}, 
                {textVariant: "body2", textContent: element.headline ? element.headline : ""}, 
            ]
        };

        retList.push({
            settings: cardSettings,
            data: cardInstanceData
        });
    });

    return retList;
};


export const buildUserCardContentList = (
    cardSettings: CardSettingProps,
    data: UserListProps ) => 
{
    const retList: any = [];
    if (!data.users) {
        return retList;
    };

    data.users.forEach(element => {
        const cardInstanceData: CardDataProps = {
            editAllowed: element.edit_permissions || false,
                editButtonDestination: `/users/${element.username_clean}` || `#`,
                actionAreaDestination: `/users/${element.username_clean}` || `#`,
                mediaURI: element.image_url || `Image Not Found`,
                mediaAltText: "TODO - Alt Text Not Stored",
                contentTexts: [
                    {textVariant: "h5", textContent: element.username ? element.username : ""}, 
                    {textVariant: "body2", textContent: element.headline ? element.headline : ""}, 
                    // {textVariant: "body2", textContent: element.description}
                ]
        };

        retList.push({
            settings: cardSettings,
            data: cardInstanceData
        });
    });

    return retList;
};