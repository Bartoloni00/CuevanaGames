<script setup>
import { ref } from "vue";

import loadingcontext from "../components/loadingcontext.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import PrincipalTitle from "../components/PrincipalTitle.vue";
import BaseInput from "../components/BaseInput.vue";

import { editUser} from "../services/auth.js";

import { useAuth } from "../composition/useAuth";

const {user, loadingUser} = useAuth()
const {
    editing,
    editData,
    processingEdit,
    handleShowFormEdit,
    handleCancelEdit,
    handleEdit,
  } = useEditingUser()



function useEditingUser () {
  const editing = ref(false)
  const editData = ref({
    displayName: null,
    level: null,
  })
  const processingEdit = ref(false)


  const handleShowFormEdit = () => {
    editing.value = true
    editData.value.displayName = user.value.displayName
    editData.value.level = user.value.level
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
  <loadingcontext :loading="loadingUser">
    <template v-if="!editing">
      <div>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Nombre de usuario:</span> <b>{{ user.displayName ? user.displayName : 'no posee nombre de usuario'}}</b>
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Nivel:</span> <b>{{ user.level ? user.level : 'usuario nivel 0'}}</b>
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Email:</span> <b>{{ user.email }}</b>
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Rol:</span> <b>{{ user.rol }}</b>
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
        </div>
        <div>
          <BaseLabel for="level">Nivel </BaseLabel>
          <BaseInput
            id="level"
            v-model="editData.level"
            :disable="processingEdit"
          ></BaseInput>
        </div>
        <BaseButton :loading="processingEdit">Guardar datos</BaseButton>
      </form>
      <div class="flex p-2">
        <BaseButton @click="handleCancelEdit" color="red" class="max-w-[520px] m-auto">Cancelar</BaseButton>
      </div>

    </template>
  </loadingcontext>
</template>
