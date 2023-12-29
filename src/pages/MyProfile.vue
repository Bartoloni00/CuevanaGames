<script setup>
import { inject, ref } from "vue";
import LoadingContext from "@/components/LoadingContext.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import PrincipalTitle from "@/components/PrincipalTitle.vue";
import BaseInput from "@/components/BaseInput.vue";
import UserDetails from "@/components/UserDetails.vue";
import { editUser, editUserImage} from "@/services/auth.js";
import { useAuth } from "@/composition/useAuth.js";

// injectamos la notificacion provista por app.
const {notification, setNotifications} = inject('notification')

const {user, loadingUser} = useAuth()
const {
    editing,
    editData,
    processingEdit,
    handleShowFormEdit,
    handleCancelEdit,
    handleEdit,
  } = useEditingUser()

const {
    editingAvatar,
    avatarData,
    processingAvatarEdit,
    handleShowAvatarEdit,
    handleAvatarEditCancel,
    handleAvatarEdit,
    handleAvatarChange,
  } = useAvatarEditForm(user)

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
            .then(()=>{
              setNotifications({
                message: `El usuario fue editado exitosamente`,
                type:'success'
              })
            })
            .catch(error=>{
              setNotifications({
                message: `Ocurrio un error inesperado al editar el usuario, ${error}`,
                type:'error'
              })
            })
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

function useAvatarEditForm(user){
  const editingAvatar = ref(false)
  const avatarData = ref({
    file: null,
    preview: null,
  })
  const processingAvatarEdit = ref(false)

  const handleShowAvatarEdit = () => editingAvatar.value = true
  const handleAvatarEditCancel = () => editingAvatar.value = false
  const handleAvatarEdit = async () => {
    processingAvatarEdit.value = true
    try {
      await editUserImage(avatarData.value.file)
      setNotifications({
        message: `Se ha cargado el avatar exitosamente`,
        type:'success'
      })
    } catch (error) {
      setNotifications({
        message: `Ocurrio un error inesperado al subir el avatar, ${error}`,
        type:'error'
      })
    }
    processingAvatarEdit.value = false
  }

  const handleAvatarChange = event => {
    // console.log('cambiaste la imagen capo', event);
    avatarData.value.file = event.target.files[0]

    // Previsualizacion:
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      avatarData.value.preview = reader.result
    })

    reader.readAsDataURL(avatarData.value.file)
  }
  return {
    editingAvatar,
    avatarData,
    processingAvatarEdit,
    handleShowAvatarEdit,
    handleAvatarEditCancel,
    handleAvatarEdit,
    handleAvatarChange,
  }
}

</script>
<template>
  <PrincipalTitle class="text-center mt-[5vh]">Mi perfil</PrincipalTitle>
  <LoadingContext :loading="loadingUser">
    <template v-if="!editing && !editingAvatar">
      <UserDetails
        :user="user"
      />
      <div class="flex gap-1">
        <BaseButton
        class="w-2/12"
        @click="handleShowAvatarEdit"
      >
        Editar imagen de perfil
      </BaseButton>
        <BaseButton
        class="w-10/12"
        @click="handleShowFormEdit"
      >
        Editar Perfil
      </BaseButton>
      </div>
    </template>
    <template v-else-if="editing">
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
    <template v-else>
      <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleAvatarEdit">
        <div>
          <BaseLabel for="photo">Imagen de perfil </BaseLabel>
          <input
            class="w-full py-1.5 px-2 border border-yellow-900 rounded mb-3 disabled:bg-slate-400"
            type="file"
            :disabled="processingAvatarEdit"
            @change="handleAvatarChange"
          />
        </div>
        <div v-if="avatarData.preview !== null">
          <p class="text-center">Previsualizacion de la imagen seleccionada: </p>
          <img 
          :src="avatarData.preview" 
          alt="Previsualizacion de la imagen seleccionada" 
          class="my-2 mx-auto"
          />
        </div>
        <BaseButton :loading="processingAvatarEdit">Guardar datos</BaseButton>
      </form>
      <div class="flex p-2">
        <BaseButton @click="handleAvatarEditCancel" color="red" class="max-w-[520px] m-auto">Cancelar</BaseButton>
      </div>
    </template>
  </LoadingContext>
</template>
