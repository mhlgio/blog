# blog Helm chart

Deploy the Astro blog locally:

```sh
helm upgrade --install blog ./charts/blog
kubectl port-forward svc/blog 8080:80
```

Then open <http://localhost:8080>.

If your cluster needs credentials for the Forgejo registry, create an image pull secret and pass it to the chart:

```sh
kubectl create secret docker-registry forgejo-registry \
  --docker-server=git.home.mhlg.io \
  --docker-username=<username> \
  --docker-password=<token>

helm upgrade --install blog ./charts/blog \
  --set imagePullSecrets[0].name=forgejo-registry
```

Override the image tag when deploying a specific build:

```sh
helm upgrade --install blog ./charts/blog --set image.tag=<commit-sha>
```
