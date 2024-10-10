// import * as tf from '@tensorflow/tfjs';
// // import * as tf from '@tensorflow/tfjs-node';  // 使用 tfjs-node 而非 tfjs
// import * as fs from 'fs';
// // 简化的战斗环境
// class SimpleBattleEnvironment {
//     playerHealth: number;
//     enemyHealth: number;
//     constructor() {
//         this.reset();
//     }

//     // 重置战斗状态
//     reset() {
//         this.playerHealth = 10;
//         this.enemyHealth = 10;
//         return [this.playerHealth, this.enemyHealth];  // 返回初始状态
//     }

//     // 执行动作：0 = 攻击，1 = 防御
//     step(action) {
//         const enemyAttack = Math.random() > 0.5 ? 2 : 1;  // 敌人攻击造成的伤害

//         if (action === 0) {  // 攻击
//             this.enemyHealth -= 2;  // 玩家攻击敌人造成2点伤害
//         } else if (action === 1) {  // 防御
//             this.playerHealth -= Math.max(0, enemyAttack - 1);  // 防御减少一部分伤害
//         }

//         this.playerHealth -= enemyAttack;  // 敌人攻击玩家

//         // 检查游戏是否结束
//         const done = this.enemyHealth <= 0 || this.playerHealth <= 0;
//         const reward = this.enemyHealth <= 0 ? 1 : (this.playerHealth <= 0 ? -1 : 0);  // 胜利+1，失败-1

//         return {
//             state: [this.playerHealth, this.enemyHealth],
//             reward,
//             done
//         };
//     }
// }

// // 创建简单的模型
// function createSimpleModel() {
//     const model = tf.sequential();

//     // 输入层：2 个输入（玩家血量和敌人血量）
//     model.add(tf.layers.dense({ units: 8, inputShape: [2], activation: 'relu' }));
//     model.add(tf.layers.dense({ units: 8, activation: 'relu' }));

//     // 输出层：2 个输出（0 = 攻击，1 = 防御）
//     model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));

//     // 编译模型
//     model.compile({
//         optimizer: 'adam',
//         loss: 'categoricalCrossentropy',
//         metrics: ['accuracy']
//     });

//     return model;
// }

// // 生成训练数据
// function generateTrainingData(env, numGames) {
//     const xs = [];
//     const ys = [];

//     for (let i = 0; i < numGames; i++) {
//         env.reset();
//         let done = false;

//         while (!done) {
//             const action = Math.random() > 0.5 ? 0 : 1;  // 随机选择动作
//             const { state, reward, done: gameDone } = env.step(action);

//             xs.push(state);  // 状态作为输入
//             ys.push(action === 0 ? [1, 0] : [0, 1]);  // 动作作为输出（one-hot 编码）

//             done = gameDone;
//         }
//     }

//     return {
//         xs: tf.tensor2d(xs),
//         ys: tf.tensor2d(ys)
//     };
// }
// // 保存模型到本地文件
// async function saveModel(model) {
//     const dir = './model';
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);  // 创建文件夹
//     }

//     // 保存模型结构
//     const modelJSON = model.toJSON();
//     fs.writeFileSync(`${dir}/model.json`, modelJSON);
//     console.log('Model structure saved to ./model/model.json');

//     // 保存模型权重
//     const weights = model.getWeights();
//     const weightsData = await Promise.all(weights.map(tensor => tensor.data()));
//     const weightsMetadata = weights.map(tensor => ({
//         shape: tensor.shape,
//         dtype: tensor.dtype,
//     }));

//     // 将权重保存为 JSON 文件
//     fs.writeFileSync(`${dir}/weights.json`, JSON.stringify({
//         data: weightsData,
//         metadata: weightsMetadata
//     }));
//     console.log('Model weights saved to ./model/weights.json');
// }

// // 加载已保存的模型
// async function loadModel() {
//     console.log('load start')
//     const modelJSON = JSON.parse(fs.readFileSync('./model/model.json', 'utf8'));
//     const weightsData = JSON.parse(fs.readFileSync('./model/weights.json', 'utf8'));

//     // 重新创建模型结构
//     const model = await tf.models.modelFromJSON(modelJSON);
    
//     // 将权重数组转换为 TypedArray 并加载到模型中
//     const weightTensors = weightsData.data.map((data, index) => {
//         const typedArray = new Float32Array(data);  // 这里确保使用适合的数据类型
//         return tf.tensor(typedArray, weightsData.metadata[index].shape, weightsData.metadata[index].dtype);
//     });

//     model.setWeights(weightTensors);
//     console.log('Model loaded from ./model');

//     return model;
// }
// async function trainAndTestModel() {
//     const env = new SimpleBattleEnvironment();

//     let model;
//     try {
//         // 尝试加载已保存的模型
//         model = await loadModel();
//     } catch (error) {
//         console.log('No saved model found, training a new one...');
//         // 如果没有找到已保存的模型，则训练新模型
//         model = createSimpleModel();
//     }
//     // 生成训练数据
//     const { xs, ys } = generateTrainingData(env, 1000);

//     // 训练模型
//     await model.fit(xs, ys, {
//         epochs: 50,
//         callbacks: {
//             onEpochEnd: (epoch, logs) => {
//                 console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
//             }
//         }
//     });
//     // 训练完成后保存模型
//     await saveModel(model);  // 调用保存模型的函数
//     // 测试模型
//     const testEnv = new SimpleBattleEnvironment();
//     let state = testEnv.reset();

//     console.log("Initial state:", state);

//     let done = false;
//     while (!done) {
//         const prediction = model.predict(tf.tensor2d([state]));

//         // 处理 `Tensor<Rank>[]` 或 `Tensor` 的返回
//         const actionTensor = Array.isArray(prediction) ? prediction[0] : prediction;
//         const action = actionTensor.argMax(1).dataSync()[0];  // 获取预测动作

//         console.log(`Predicted action: ${action === 0 ? 'Attack' : 'Defend'}`);

//         const result = testEnv.step(action);
//         state = result.state;
//         done = result.done;

//         console.log(`Player Health: ${state[0]}, Enemy Health: ${state[1]}`);
//     }

//     if (state[0] > 0) {
//         console.log("Player Wins!");
//     } else {
//         console.log("Enemy Wins!");
//     }
// }

// class ai {
//     constructor() {

//     }
//     test() {
//         trainAndTestModel();
//     }
// }
// export default new ai();
