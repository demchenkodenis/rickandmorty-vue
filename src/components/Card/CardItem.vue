<template>
  <article class="card">
    <Avatar :src="card.image" :alt="card.name" />
    <div class="bio">
      <div class="name">{{ card.name }}</div>
      <div class="status">
        <span class="status-color" :style="{ 'background-color': statusColor(card.status) }"></span>
        {{ card.status }} - {{ card.species }}
      </div>
      <div class="location">
        Последняя известная локация:
        <div>{{ card.location.name }}</div>
      </div>
      <div class="episode">
        Впервые персонаж появился в серии:
        <div>{{ card.first_seen }}</div>
      </div>
    </div>
  </article>
</template>
<script setup>
import Avatar from './CardAvatar.vue'

defineProps({
  card: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    species: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    gender: {
      type: String,
      required: true
    },
    origin: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        url: ''
      }),
      validator: (value) => typeof value.name === 'string' && typeof value.url === 'string'
    },
    location: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        url: ''
      }),
      validator: (value) => typeof value.name === 'string' && typeof value.url === 'string'
    },
    image: {
      type: String,
      required: true
    },
    episode: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) => value.every((item) => typeof item === 'string')
    },
    url: {
      type: String,
      required: true
    },
    created: {
      type: String,
      required: true
    }
  }
})

const statusColor = (status) => (status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'gray')
</script>
<style scoped lang="scss">
.card {
  justify-self: center;
  display: flex;
  border: 1px solid var(--vt-c-black-mute);
  border-radius: 4px;
  width: 600px;
  min-height: 220px;
  background: rgb(60, 62, 68);
  border-radius: 8px;
  overflow: hidden;
}

.card {
  .bio {
    display: flex;
    flex-direction: column;
    flex: 3 1 0%;
    padding: 16px;

    .name {
      font-size: 24px;
      font-weight: 700;
      color: var(--vt-c-white);
    }
    .status {
      font-size: 18px;
      font-weight: 600;
      color: var(--vt-c-white-off);

      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        margin-bottom: 3px;
      }
    }

    .location {
      margin-top: 10px;
      font-size: 16px;
      color: var(--vt-c-white-off);

      div {
        font-size: 18px;
        color: var(--vt-c-white);
      }
    }
    .episode {
      margin-top: 10px;
      font-size: 16px;
      color: var(--vt-c-white-off);

      div {
        font-size: 18px;
        color: var(--vt-c-white);
      }
    }
  }
}

@media (max-width: 768px) {
  .card {
    flex-direction: column;
    max-width: 100%;
    min-height: initial;
  }
}
</style>
