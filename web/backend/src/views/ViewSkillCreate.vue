<template>
  <div style="width: 100vw;">
    <h1>This is ViewSkillCreate11</h1>
    <avue-form style="width: 100%;" :option="option" @submit="submit"></avue-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const option = ref(
  {
    column: [
      {
        label: '技能名称',
        prop: 'name',
        type: 'input',
        width: 20,
        size: 'mini'
      },
      {
        label: '技能类型',
        prop: 'type',
        type: 'select',
        dicData: [
          { label: '主动技能', value: '主动技能' },
          { label: '被动技能', value: '被动技能' }
        ]
      },
      {
        label: '目标',
        prop: 'target',
        type: 'select',
        dicData: [
          { label: '敌人', value: '敌人' },
          { label: '自己', value: '自己' }
        ]
      },
      {
        label: '冷却时间',
        prop: 'cd',
        type: 'number',
      },
      {
        label: '范围类型',
        prop: 'rang_type',
        type: 'select',
        dicData: [
          { label: '单体伤害', value: '单体伤害' },
          { label: '群体伤害', value: '群体伤害' }
        ]
      },
      {
        label: '范围数量',
        prop: 'rang_num',
        type: 'number'
      },
      {
        label: '效果',
        prop: 'effects',
        type: 'dynamic',
        children: {
          align: 'center',
          headerAlign: 'center',
          column: [
            {
              label: '标签',
              prop: 'tag',
              type: 'cascader',
              dicData: [
                {
                  label: '伤害类',
                  value: '伤害类',
                  children: [
                    { label: '物理伤害', value: '1' },
                    { label: '魔法伤害', value: '2' }
                  ]
                },
                {
                  label: '防御类',
                  value: '防御类',
                  children: [
                    { label: '物理防御', value: '1' },
                    { label: '魔法防御', value: '2' }
                  ]
                }
              ]
            },
            {
              label: '数据',
              prop: 'data',
              type: 'object',
              children: {
                column: [
                  {
                    label: '范围类型',
                    prop: 'rang_type',
                    type: 'select',
                    dicData: [
                      { label: '单体伤害', value: '单体伤害' },
                      { label: '群体伤害', value: '群体伤害' }
                    ]
                  },
                  {
                    label: '范围数量',
                    prop: 'rang_num',
                    type: 'number'
                  },
                  {
                    label: '数值',
                    prop: 'val_str',
                    type: 'input'
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  },


);
const form = ref({
  name: '1112',
  type: '',
  target: '',
  cd: -1,
  rang_type: '',
  rang_num: 1,
  effects: [
    {
      tag: [],
      data: {
        rang_type: '',
        rang_num: 1,
        val_str: ''
      }
    }
  ]
});

const submit = (data: any) => {
  console.log(data);
};
</script>