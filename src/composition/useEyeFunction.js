import { ref } from "vue";

export function useEyeFunction() {
  const passwordInputType = ref('password');

  const ICON_EYE = {
    enable: { url: '/icons/visibility.svg', text: 'Icono del ojo habilitado' },
    disable: { url: '/icons/visibility_off.svg', text: 'Icono del ojo deshabilitado' }
  };

  const iconEye = ref(ICON_EYE.disable);

  function handleEye() {
    if (passwordInputType.value === 'password') {
      passwordInputType.value = 'text';
      iconEye.value = ICON_EYE.enable;
    } else {
      passwordInputType.value = 'password';
      iconEye.value = ICON_EYE.disable;
    }
  }

  return {
    passwordInputType,
    handleEye,
    iconEye,
  };
}
