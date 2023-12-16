<script setup>
import { editUser, subscribeToAuth } from "../services/auth.js";
import BaseLoader from "../components/BaseLoader.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import PrincipalTitle from "../components/PrincipalTitle.vue";
import BaseInput from "../components/BaseInput.vue";
import { onMounted, onUnmounted, ref } from "vue";

const {user, loadingUser} = useUserAuth()
const {
    editing,
    editData,
    processingEdit,
    handleShowFormEdit,
    handleCancelEdit,
    handleEdit,
  } = useEditingUser()

function useUserAuth () {
  const user = ref({
  id: null,
  email: null,
  rol: null,
  displayName: null
})
const loadingUser = ref(true)
let authUnsubscribe =  () => {}

onMounted(() => {
    loadingUser.value = true;
    authUnsubscribe.value = subscribeToAuth((userAuth) => (user.value = userAuth));
    loadingUser.value = false;
  })

onUnmounted(() => authUnsubscribe())

return {
  user,
  loadingUser
}
}

function useEditingUser () {
  const editing = ref(false)
  const editData = ref({
    displayName: null,
  })
  const processingEdit = ref(false)


  const handleShowFormEdit = () => {
    editing.value = true
    editData.value.displayName = user.value.displayName
  }
  const handleCancelEdit = () => {
    editing.value = false
  }

  const handleEdit = async () => {
    processingEdit.value = true
    await editUser(editData.value)
    processingEdit.value = false
    handleCancelEdit()
  }

  return {
    editing,
    editData,
    processingEdit,
    handleShowFormEdit,
    handleCancelEdit,
    handleEdit,
  }
}
</script>
<template>
  <PrincipalTitle>Mi perfil</PrincipalTitle>
  <template v-if="!loadingUser">
    <template v-if="!editing">
      <div>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Nombre de usuario:</span> {{ user.displayName ? user.displayName : 'no posee nombre de usuario'}}
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Email:</span> {{ user.email }}
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Rol:</span> {{ user.rol }}
        </p>
      </div>
      <BaseButton
        @click="handleShowFormEdit"
      >
        Editar Perfil
      </BaseButton>
    </template>
    <template v-else>
      <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleEdit">
        <div>
          <BaseLabel for="displayName">Nombre </BaseLabel>
          <BaseInput
            id="displayName"
            v-model="editData.displayName"
            :disable="processingEdit"
          ></BaseInput>
            <BaseButton :loading="processingEdit">Guardar datos</BaseButton>
        </div>
      </form>
      <div class="flex p-2">
        <BaseButton @click="handleCancelEdit" color="red" class="max-w-[520px] m-auto">Cancelar</BaseButton>
      </div>

    </template>
  </template>
  <template v-else>
    <BaseLoader />
  </template>
</template>
