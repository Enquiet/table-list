import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUserField, IUser } from '@/type/IUser'

const userFieldList: IUserField[] = [
  {
    id: 1,
    title: 'ID'
  },
  {
    id: 2,
    title: 'Имя'
  },
  {
    id: 3,
    title: 'Возраст'
  }
]
const users: IUser[] = [
  {
    id: '1',
    name: 'Евгений',
    age: 25
  }
]
export const useStoreUser = defineStore('storeUser', () => {
  const userField = ref<IUserField[]>([])
  /**
   * Загружаем поля юзеров
   */
  const getUserField = () => {
    userField.value = userFieldList
  }

  const userList = ref<IUser[]>([])
  /**
   * Загружаем список юзуров
   */
  const getUserList = () => {
    userList.value = (JSON.parse(localStorage.getItem('userList') as string) as IUser[]) || users
  }

  const user = ref({} as IUser)
  /**
   * Находим нужного юзера
   * @param id
   */
  const onFindUser = (id: string) => {
    user.value = userList.value.find((item: IUser) => item.id === id) as IUser
  }

  /**
   * Сохранение списка в LS
   * @param list
   */
  const onSaveList = (list: IUser[]) => {
    localStorage.setItem('userList', JSON.stringify(list))
  }

  /**
   * Сохраняем нового юзера или добавляем зименения в юзера
   * @param user
   */
  const onSaveUser = (user: IUser) => {
    const findUser = userList.value.find((item: IUser) => item.id === user.id)
    if (findUser) {
      findUser.age = user.age
      findUser.name = user.name
      onSaveList(userList.value)
      return
    }
    userList.value.unshift(user)
    onSaveList(userList.value)
  }

  /**
   * Удаляем юзера
   * @param id
   */
  const onDeleteUser = (id: string) => {
    userList.value = userList.value.filter((item) => item.id !== id)
    onSaveList(userList.value)
  }

  return {
    user,
    userField,
    userList,
    getUserList,
    getUserField,
    onSaveUser,
    onFindUser,
    onDeleteUser
  }
})
