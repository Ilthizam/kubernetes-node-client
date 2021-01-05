# kubernetes-node-client

## Creating a KIND cluster 

```
kind create cluster --name <cluster-name> --image kindest/node:v1.18.4
```

## Deployment

```
 kubectl apply -f .\src\deployment.yaml
```


## Port-Forward

```
kubectl port-forward <pod-name> 3000
```
