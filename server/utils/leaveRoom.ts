import { User } from "../user/userModel";

const leaveRoom = (userId: string, chatRoomUsers: User[]): User[] => {
  return chatRoomUsers.filter((user) => user.id !== userId);  
};

export { leaveRoom };