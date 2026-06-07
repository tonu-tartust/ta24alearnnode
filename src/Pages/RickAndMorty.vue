<script setup>
import axios from "axios";
import { computed, ref, reactive } from "vue";
import CharacterCard from "../Components/CharacterCard.vue";
let characters = ref([]);
let pagination = ref({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
});

let current = ref(1);
let searchInput = ref("");
const filters = reactive({ status: "", gender: "" });

await getCharacters(current.value);
async function getCharacters(page) {
    current.value = page;
    let res = await axios.get("https://rickandmortyapi.com/api/character", {
        params: {
            page: page,
            name: searchInput.value,
            status: filters.status,
            gender: filters.gender,
        },
    });
    console.log(res.data);
    characters.value = res.data.results;
    pagination.value = res.data.info;
}

async function prev() {
    await getCharacters(current.value - 1);
}
async function next() {
    await getCharacters(current.value + 1);
}
async function toggleFilter(type, value) {
    if (filters[type] === value) {
        filters[type] = "";
    } else {
        filters[type] = value;
    }
    await getCharacters(1);
}
async function clearFilters() {
    filters.status = "";
    filters.gender = "";
    searchInput.value = "";
    await getCharacters(1);
}

let pages = computed(() => {
    let pages = [];
    for (let i = 1; i <= 3; i++) {
        pages[i] = i;
    }
    if (current.value > 6) {
        pages.push("...");
    }
    for (
        let i = current.value - 2;
        i <= current.value + 2 && i <= pagination.value.pages;
        i++
    ) {
        pages[i] = i;
    }
    if (current.value < pagination.value.pages - 1) {
        pages.push("...");
    }
    for (let i = pagination.value.pages - 1; i <= pagination.value.pages; i++) {
        pages[i] = i;
    }

    return pages.filter((p) => p);
});
let searchTimeout = null;
function search() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        await getCharacters(1);
    }, 1000);
}
</script>

<template>
    <div class="container">
        <nav class="level mt-4">
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5"><strong>Status:</strong></p>
                </div>
                <div class="level-item">
                    <div class="field is-grouped is-grouped-multiline">
                        <div class="control">
                            <div class="buttons has-addons">
                                <button
                                    class="button is-small"
                                    :class="[
                                        filters.status === 'alive'
                                            ? 'is-link'
                                            : 'is-light',
                                    ]"
                                    @click="toggleFilter('status', 'alive')"
                                >
                                    Alive
                                </button>
                                <button
                                    class="button is-small"
                                    :class="[
                                        filters.status === 'dead'
                                            ? 'is-link'
                                            : 'is-light',
                                    ]"
                                    @click="toggleFilter('status', 'dead')"
                                >
                                    Dead
                                </button>
                                <button
                                    class="button is-small"
                                    :class="[
                                        filters.status === 'unknown'
                                            ? 'is-link'
                                            : 'is-light',
                                    ]"
                                    @click="toggleFilter('status', 'unknown')"
                                >
                                    Unknown
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="level-item ml-4">
                    <p class="subtitle is-5"><strong>Gender:</strong></p>
                </div>
                <div class="level-item">
                    <div class="field is-grouped is-grouped-multiline">
                        <div class="control">
                            <div class="buttons has-addons">
                                <button
                                    class="button is-small"
                                    :class="[
                                        filters.gender === 'female'
                                            ? 'is-link'
                                            : 'is-light',
                                    ]"
                                    @click="toggleFilter('gender', 'female')"
                                >
                                    Female
                                </button>
                                <button
                                    class="button is-small"
                                    :class="[
                                        filters.gender === 'male'
                                            ? 'is-link'
                                            : 'is-light',
                                    ]"
                                    @click="toggleFilter('gender', 'male')"
                                >
                                    Male
                                </button>
                                <button
                                    class="button is-small"
                                    :class="[
                                        filters.gender === 'genderless'
                                            ? 'is-link'
                                            : 'is-light',
                                    ]"
                                    @click="
                                        toggleFilter('gender', 'genderless')
                                    "
                                >
                                    Genderless
                                </button>
                                <button
                                    class="button is-small"
                                    :class="[
                                        filters.gender === 'unknown'
                                            ? 'is-link'
                                            : 'is-light',
                                    ]"
                                    @click="toggleFilter('gender', 'unknown')"
                                >
                                    Unknown
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="level-item ml-4">
                    <button
                        class="button is-small is-danger is-outlined"
                        @click="clearFilters"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </nav>

        <div class="field has-addons mt-4">
            <div class="control is-expanded">
                <input
                    @input="search"
                    v-model="searchInput"
                    class="input"
                    type="text"
                    placeholder="Name"
                />
            </div>
            <div class="control">
                <button class="button is-info" @click="search">Search</button>
            </div>
        </div>
        <nav
            class="pagination is-centered"
            role="navigation"
            aria-label="pagination"
        >
            <button
                class="pagination-previous"
                :disabled="!pagination.prev"
                @click="prev"
            >
                Previous
            </button>
            <button
                class="pagination-next"
                :disabled="!pagination.next"
                @click="next"
            >
                Next page
            </button>
            <ul class="pagination-list">
                <li v-for="page in pages">
                    <span v-if="page === '...'" class="pagination-ellipsis"
                        >&hellip;</span
                    >
                    <button
                        v-else-if="page === current"
                        class="pagination-link is-current"
                        aria-label="Page 46"
                        aria-current="page"
                    >
                        {{ page }}
                    </button>
                    <button
                        v-else
                        class="pagination-link"
                        aria-label="Goto page 1"
                        @click="getCharacters(page)"
                    >
                        {{ page }}
                    </button>
                </li>

                <!-- <li><button class="pagination-link" aria-label="Goto page 1">1</button></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><button class="pagination-link" aria-label="Goto page 45">45</button></li>
                <li>
                    <button class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</button>
                </li>
                <li><button class="pagination-link" aria-label="Goto page 47">47</button></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><button class="pagination-link" aria-label="Goto page 86">86</button></li> -->
            </ul>
        </nav>
        <div class="columns is-multiline">
            <div class="column is-3" v-for="character in characters">
                <CharacterCard :character="character"></CharacterCard>
            </div>
        </div>
    </div>
</template>
