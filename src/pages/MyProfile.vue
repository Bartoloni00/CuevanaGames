<script>
import { editUser, subscribeToAuth } from "../services/auth.js";
import BaseLoader from "../components/BaseLoader.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import PrincipalTitle from "../components/PrincipalTitle.vue";
import BaseInput from "../components/BaseInput.vue";

export default {
  name: "MyProfile",
  data() {
    return {
      user: {
        id: null,
        email: null,
        rol: null,
        displayName: null
      },
      loadingUser: true,
      authUnsubscribe: () => {},
      editing: false,
      editData:{
        displayName: null,
      },
      processingEdit: false,
    };
  },
  methods:{
    handleShowFormEdit(){
      this.editing = true
      this.editData.displayName = this.user.displayName
    },
    handleCancelEdit(){
      this.editing = false
    },
    async handleEdit(){
      this.processingEdit = true
      await editUser(this.editData)
      this.processingEdit = false
    },
  },
  mounted() {
    this.loadingUser = true;
    this.authUnsubscribe = subscribeToAuth((user) => (this.user = user));
    this.loadingUser = false;
  },
  unmounted() {
    this.authUnsubscribe = () => {};
  },
  components: { BaseLoader, PrincipalTitle, BaseButton, BaseLabel, BaseInput },
};
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
