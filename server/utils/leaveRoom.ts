import { UserDto } from "../user/userDtoModel";

const leaveRoom = (userId: string, chatRoomUsers: UserDto[]): UserDto[] => {
  return chatRoomUsers.filter((user) => user.id !== userId);  
};

export { leaveRoom };